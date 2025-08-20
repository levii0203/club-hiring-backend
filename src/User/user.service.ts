import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UserSignUpDto } from "./dto/user-signup.dto";
import { AdminSignUpDto } from "./dto/admin-signup.dtp";
import { ROLE } from "./user.entity";


@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>){}

    async getAllUser():Promise<any> {
        const users = await this.userRepository.find()
        return users
    }

    async getAllAdmins():Promise<any> {
        const role:ROLE = ROLE.ADMIN
        const users = await this.userRepository.find({where:{role}})
        return users
    }

    saveUser(userDto:UserSignUpDto):Promise<any> {
        return this.userRepository.save(userDto)
    }

    saveAdmin(adminDto:AdminSignUpDto):Promise<any> {
        return this.userRepository.save(adminDto)
    }

    async getUserPrimaryDataByRegistrationNumber(registration_number:string):Promise<UserEntity|null> {
        const user = await this.userRepository.findOne({where:{registration_number},select:['email','password','registration_number','role']})
        return user
    }

    async getUserByRegistrationNumber(registration_number:string):Promise<UserEntity|null> {
        const user = await this.userRepository.findOne({where:{registration_number}})
        return user
    }

    async getUserDataByClub(club:string,club_role:string):Promise<UserEntity|null> {
        const user = await this.userRepository.findOne({where:{club, club_role},select:['email','registration_number']})
        return user
    }

    async addClubToUser(club_id:string, registration_number:string):Promise<any> {
        return await this.userRepository.createQueryBuilder().update('users').set({
            in_clubs: () => `array_append(array_remove("in_clubs", :club_id), :club_id)`
        })
        .where("registration_number = :registration_number",{registration_number,club_id}).execute()
    }

    async updateUserPassword(registration_number:string, new_password:string):Promise<any> {
        return await this.userRepository.createQueryBuilder().update('users').set({
            password:new_password
        }).where({registration_number:registration_number}).execute()
    }

    async getUserRoleInClub(registration_number:string, club:string):Promise<any> {
        return await this.userRepository.findOne({where:{registration_number,club},select:['email','role','phone_number','registration_number']})
    }

}