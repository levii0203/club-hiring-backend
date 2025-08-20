import { Controller, Scope , Get , HttpException , HttpStatus , Body , Post } from "@nestjs/common";
import { ClubService } from "./club.service";
import { ClubRegisterDto } from "./dto/club-register.dto";
import { UserService } from "src/User/user.service";
import { ROLE } from "src/User/user.entity";

@Controller({path:'club',scope:Scope.REQUEST,version:'1'})
export class ClubController {
    constructor(
        private readonly clubService:ClubService,
        private readonly userService:UserService
    ){}

    @Get('get/all')
    async getAll():Promise<any> {
        try {
            
        }
        catch(error){
            if(error instanceof HttpException) throw error
            throw new  HttpException('Internal Server Error',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('register')
    async registerClub(
        @Body() clubDto:ClubRegisterDto
    ):Promise<any> {
        try {
            if(!clubDto.registered_admin || !clubDto.registered_admin_email){
                throw new HttpException('Invalid admin',HttpStatus.BAD_REQUEST)
            }
            const user = await this.userService.getUserByRegistrationNumber(clubDto.registered_admin)
            if(!user){
                throw new HttpException('User not found',HttpStatus.NOT_FOUND)
            }
            if(user.role!==ROLE.ADMIN){
                throw new HttpException('User is not an admin', HttpStatus.UNAUTHORIZED)
            }
            await this.clubService.saveClub(clubDto)
            return {"message":"club successfully registered!"}
        }
        catch(error){
            if(error instanceof HttpException) throw error
            throw new  HttpException('Internal Server Error',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }






}