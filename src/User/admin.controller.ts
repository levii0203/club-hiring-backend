import { Controller, Scope, Get, Post , Body , HttpException , HttpStatus } from "@nestjs/common";
import bcrypt from 'bcrypt'
import { ROLE } from "./user.entity";
import { UserService } from "./user.service";
import { AdminSignUpDto } from "./dto/admin-signup.dtp";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute.js";

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

}
