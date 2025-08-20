
import { Injectable, NestMiddleware , HttpException , HttpStatus } from "@nestjs/common";
import { NextFunction , Request , Response } from "express";
import { RedisService } from "src/Redis/redis.service";

@Injectable()
export class LoginMiddleware implements NestMiddleware {
    constructor(private readonly rdb:RedisService){}

    async use(req:Request, res:Response, next:NextFunction){
        try {
            const registration_number = req.body.registration_number
            await this.rdb.IncrementLoginCount(registration_number)
            const cnt = await this.rdb.GetLoginCount(registration_number)
            if(cnt>5){
                throw new HttpException('Retry limit exceeded!', HttpStatus.FORBIDDEN)
            }
            next()
        }   
        catch(error){
            console.log(error)
            throw new HttpException('Internal server error',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}

