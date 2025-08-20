import { Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClubEntity } from "./club.entity";
import { Repository } from "typeorm";
import { ClubRegisterDto } from "./dto/club-register.dto";

@Injectable({scope:Scope.DEFAULT})
export class ClubService {
    constructor(@InjectRepository(ClubEntity) private readonly clubRepository:Repository<ClubEntity>) {}

    async getAllClub():Promise<any> {
        return await this.clubRepository.find()
    }

    async getClubById(id:string):Promise<ClubEntity|null> {
        return await this.clubRepository.findOne({where:{id}})
    }

    async getClubByName(club_name:string):Promise<ClubEntity|null>{
        return await this.clubRepository.findOne({where:{club_name}})
    }

    async getClubAdmins(id:string):Promise<any>{
        return await this.clubRepository.findOne({where:{id},select:['club_admins']})
    }

    async getClubPresident(id:string):Promise<any> {
        return await this.clubRepository.findOne({where:{id},select:['club_president']})
    }

    async getClubWebsites(id:string):Promise<any> {
        return await this.clubRepository.findOne({where:{id},select:['official_website_url','other_websites']})
    }

    async saveClub(clubDto:ClubRegisterDto):Promise<any> {
        return await this.clubRepository.save(clubDto)
    }

    async updateAvatarUrl(id:string,avatar_url:string):Promise<any> {
        return await this.clubRepository.createQueryBuilder().update('clubs')
        .set({avatar_url:avatar_url}).where({id:id}).execute()
    }

    async incrementHiredThisMonth(id:string):Promise<any> {
        return await this.clubRepository.createQueryBuilder().update('clubs')
        .set({hired_this_month: ()=>"hired_this_month + 1"}).where({id:id}).execute()
    }


}