import { Injectable, Scope } from "@nestjs/common";
import { MemberEntity } from "./member.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SaveMemberDto } from "./dto/save-member.dto";

@Injectable({scope:Scope.DEFAULT})
export class MemberService {
    constructor(@InjectRepository(MemberEntity) private readonly memberRepository:Repository<MemberEntity>) {}

    async saveMember(member:SaveMemberDto):Promise<any> {
        return await this.memberRepository.save(member)
    }

    async getMember(club_id: string, email:string):Promise<any> {
        return await this.memberRepository.findOne({where:{club_id, email}})
    }
}