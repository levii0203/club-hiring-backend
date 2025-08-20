import { Controller , Get , HttpException , Query, HttpStatus, Scope, Post , Body , Headers} from "@nestjs/common";
import { UserSignUpDto } from "./dto/user-signup.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { RedisService } from "src/Redis/redis.service";
import bcrypt from 'bcrypt';


@Controller({path:'users',scope:Scope.REQUEST,version:'1'})
export class UserController {
    constructor(
        private readonly userService:UserService, 
        private jwt:JwtService,
        private rdb:RedisService
    ){}

    @Get('get')
    async getUserByID(@Query('reg') reg:string):Promise<any>{
        try {
            const user = await this.userService.getUserByRegistrationNumber(reg)
            return { user }
        }
        catch(error) {
            if(error instanceof HttpException) throw error
            throw new  HttpException('Internal Server Error',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('signup')
    async signUpUser(@Body() userDto:UserSignUpDto):Promise<any>{
        try {
            if(!userDto.registration_number || !userDto.password){
                throw new HttpException('Invalid Request',HttpStatus.BAD_REQUEST)
            }
            if(userDto.role && userDto.role==='admin'){
                throw new HttpException('Invalid Request',HttpStatus.BAD_REQUEST)
            }
            const check_user = await this.userService.getUserPrimaryDataByRegistrationNumber(userDto.registration_number)
            if(check_user){
                throw new HttpException('User already exists',HttpStatus.CONFLICT)
            }
            userDto.password = await bcrypt.hash(userDto.password,10)
            await this.userService.saveUser(userDto)
        } 
        catch(error){
            if(error instanceof HttpException) throw error
            throw new  HttpException('Internal Server Error',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }   

    @Post('login')
    async loginUser(
        @Body() userReq:UserLoginDto,
        @Headers('Authorization') authorization: string,
    ):Promise<any> {
        try {   
            if(!userReq.registration_number || !userReq.password){
                throw new HttpException('Invalid Request',HttpStatus.BAD_REQUEST)
            }
            if(!authorization){
                const checkUser = await this.userService.getUserPrimaryDataByRegistrationNumber(userReq.registration_number)
                if(!checkUser){
                    throw new HttpException("User doesn't exist",HttpStatus.NOT_FOUND)
                }
                const checkPassword = bcrypt.compare(userReq.password,checkUser.password)
                if(!checkPassword){
                    throw new HttpException("Invalid credentials",HttpStatus.FORBIDDEN)
                }
                const user = await this.userService.getUserByRegistrationNumber(userReq.registration_number)
                const token = await this.jwt.sign(JSON.stringify(user),{secret:'clubhiring'})
                await this.rdb.ResetLoginCount(userReq.registration_number)
                return {'message':'User logged in successfully', 'token':token}
            }
        } 
        catch(error){
            console.log(error)
            if(error instanceof HttpException) throw error
            throw new  HttpException('Internal Server Error',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('logout')
    async logoutUser(
        @Headers('authorization') authorization: string,
    ):Promise<any> {
        try {   
            if(!authorization){
                throw new HttpException('user is unauthorized', HttpStatus.UNAUTHORIZED)
            }
            const token = authorization.split(" ")[1]
            if(!token){
                throw new HttpException('Invalid token',HttpStatus.UNAUTHORIZED)
            }
            return { message:"User logout successfully!"}
        } 
        catch(error){
            if(error instanceof HttpException) throw error
            throw new  HttpException('Internal Server Error',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get('applications')
    async getApplications(
        @Headers('Authorization') authorization:string
    ){
        try {
            if(!authorization){
                throw new HttpException('Unauthorized access',HttpStatus.UNAUTHORIZED)
            }
            const token = authorization.split(" ")[1]
            if(!token){
                throw new HttpException('Invalid access token',HttpStatus.FORBIDDEN)
            }
            const decodedUser = await this.jwt.decode(token)
            const user = await this.userService.getUserByRegistrationNumber(decodedUser.registration_number)
            return user?.applications
        }
        catch(error){
            console.log(error)
            if(error instanceof HttpException) throw error
            throw new  HttpException('Internal Server Error',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('change-password')
    async getChangePassword(
        @Body() newReq:ChangePasswordDto,
        @Headers('Authorization') authorization:string
    ){
        try{
            if(!authorization){
                throw new HttpException('Unauthorized access',HttpStatus.UNAUTHORIZED)
            }
            const token = authorization.split(" ")[1]
            if(!token){
                throw new HttpException('Invalid access token',HttpStatus.FORBIDDEN)
            }
            const decodedUser = await this.jwt.decode(token)
            const ok = bcrypt.compare(newReq.current_password, decodedUser.password)
            if(!ok){
                throw new HttpException('Incorrect password', HttpStatus.NOT_ACCEPTABLE)
            }
            const hashedPassword = await bcrypt.hash(newReq.new_password,10)
            decodedUser.password = hashedPassword
            await this.userService.updateUserPassword(decodedUser.registration_number,hashedPassword)
            return {"message":"password changed successfully"}
        }
        catch(error){
            console.log(error)
            if(error instanceof HttpException) throw error
            throw new  HttpException('Internal Server Error',HttpStatus.INTERNAL_SERVER_ERROR)
        }
        
    }
}