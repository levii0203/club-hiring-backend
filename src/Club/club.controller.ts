import { Controller, Scope , Get , HttpException , HttpStatus , Body , Post , Headers } from "@nestjs/common";

import { UserEntity } from "src/User/user.entity";

import { JwtService } from "@nestjs/jwt";
import { ClubService } from "./club.service";
import { UserService } from "src/User/user.service";
import { MemberService } from "./member.service";
import { ApplicationService } from "./application.service";

import { ClubRegisterDto } from "./dto/club-register.dto";
import { SaveMemberDto } from "./dto/save-member.dto";
import { JoinClubDto } from "./dto/join-club.dto";

@Controller({path:'club',scope:Scope.REQUEST,version:'1'})
export class ClubController {
    constructor(
        private readonly clubService:ClubService,
        private readonly memberService:MemberService,
        private readonly jwtService:JwtService,
        private readonly applicationService:ApplicationService
    ){}

    @Get('get/all')
    async getAll():Promise<any> {
        try {
            const clubs = await this.clubService.getAllClub()
            return {clubs:clubs}
        }
        catch(error){
            if(error instanceof HttpException) throw error
            throw new HttpException('Internal Server Error',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('hire')
    async registerClUB(
        @Body() clubGto:ClubRegisterDto,
        @Headers('Authorization') authorization:string 
    ):Promise<any> {
        try {
            
        }
        catch(error){
            if(error instanceof HttpException) throw error
            throw new HttpException('Internal Server Error',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('save')
    async saveClub(
        @Body() club: ClubRegisterDto
    ):Promise<any> {
        console.log("Request to add a club")
        try {
            if(!club.club_name || !club.id) {
                throw new HttpException('Invalid club details', HttpStatus.NOT_ACCEPTABLE)
            }
            const check = await this.clubService.getClubByName(club.club_name)
            if(check) {
                throw new HttpException('Club already exists!', HttpStatus.CONFLICT)
            }
            const res = await this.clubService.saveClub(club)
            return {"message":"club added successfully!"}
        }
        catch(error){
            console.log(error)
            if(error instanceof HttpException) throw error
            throw new HttpException('Internal Server Error',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('join')
    async applyToClub(
        @Body() joinClub: JoinClubDto,
        @Headers('Authorization') authorization:string 
    ): Promise<any> {
        console.log("Request to join a club")
        try {
            if(!authorization || !authorization.length) {
                throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED)
            }
            const token = authorization.split(" ")[1]
            if(!token) {
                throw new HttpException('Invalid token', HttpStatus.NOT_ACCEPTABLE)
            }
            const decodedUser:UserEntity = await this.jwtService.decode(token)
            if(!decodedUser){
                throw new HttpException('Invalid token', HttpStatus.NOT_ACCEPTABLE)
            }
            const exists = await this.memberService.getMember(joinClub.club_id, decodedUser.email)
            if(exists) {
                throw new HttpException('You are already a member of the club!', HttpStatus.CONFLICT)
            }
            const res = await this.applicationService.saveApplication(joinClub)
            return {"message":"Successfully applied"}

        }
        catch(error){
            console.log(error)
            if(error instanceof HttpException) throw error
            throw new HttpException('Internal Server Error',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}