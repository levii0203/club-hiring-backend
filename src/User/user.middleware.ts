
import { Injectable, NestMiddleware , HttpException , HttpStatus } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { RedisService } from "src/Redis/redis.service";
import { NextFunction , Request , Response } from "express";

@Injectable()
export class LoginMiddleware implements NestMiddleware {
    constructor(private readonly rdb:RedisService){}

    async use(req:Request, res:Response, next:NextFunction){
        try {
            const email = req.body.email
            const cnt = await this.rdb.GetLoginCount(email)
            if(cnt>5){
                throw new HttpException('Retry limit exceeded!', HttpStatus.FORBIDDEN)
            }
            await this.rdb.IncrementLoginCount(email)
            next()
        }   
        catch(error){
            console.log(error)
            if((error as Error).message ==="Retry limit exceeded!") {
                throw new HttpException('Retry limit exceeded!', HttpStatus.FORBIDDEN)
            }
            throw new HttpException('Internal server error',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}

@Injectable()
export class VerifyStudentMiddleware implements NestMiddleware {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            if(!req.headers.authorization) {
                throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED)
            }
            const token = req.headers.authorization.split(" ")[1]
            if(!token) {
                throw new HttpException('unauthorized access token', HttpStatus.UNAUTHORIZED)
            }
            const decodedUser: UserEntity  = await this.jwtService.decode(token)
            const user = await this.userService.getUserByEmailAndPassword(
                decodedUser.email, decodedUser.password
            )
            if(!user){
                throw new HttpException('User not found!', HttpStatus.NOT_FOUND)
            }
            next()
        }
        catch(error) {
            console.log(error)
            throw new HttpException('Internal server error',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

