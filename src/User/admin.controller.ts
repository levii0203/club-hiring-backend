import { Controller, Scope, Get, Post , Body , HttpException , HttpStatus } from "@nestjs/common";
import bcrypt from 'bcrypt'
import { ROLE } from "./user.entity";
import { UserService } from "./user.service";
import { AdminSignUpDto } from "./dto/admin-signup.dtp";

//Only for Admin Validation 
//Note: User Controller for admins will still be used for common purposes
@Controller({path:'admin', scope:Scope.REQUEST,version:'1'})
export class AdminController {
    constructor(private userService:UserService){}

    @Get('get/all')
    async getAll():Promise<any> {
        const users = await this.userService.getAllAdmins()
        return { admins: users }
    }

    @Post('signup')
    async signUpAdmin(
        @Body() adminDto:AdminSignUpDto
    ):Promise<any> {
        try {
            if(!adminDto.registration_number || !adminDto.password || !adminDto.club_role){
                throw new HttpException('Invalid Request',HttpStatus.BAD_REQUEST)
            }
            if(adminDto.role && adminDto.role==='user'){
                throw new HttpException('Invalid Request',HttpStatus.BAD_REQUEST)
            }
            if(adminDto.club && adminDto.club_role!=='none'){
                const check_admin = await this.userService.getUserDataByClub(adminDto.club, adminDto.club_role)
                if(check_admin){
                    throw new HttpException('Admin already exists with this role',HttpStatus.FORBIDDEN)
                }
            }
            const check_user = await this.userService.getUserPrimaryDataByRegistrationNumber(adminDto.registration_number)
            if(check_user && check_user.role==='admin'){
                throw new HttpException('User already exists',HttpStatus.CONFLICT)
            }
            adminDto.role = ROLE.ADMIN
            adminDto.password = await bcrypt.hash(adminDto.password,10)
            await this.userService.saveAdmin(adminDto)
        } 
        catch(error){
            if(error instanceof HttpException) throw error
            throw new  HttpException('Internal Server Error',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
