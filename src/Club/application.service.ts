import { Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApplicationEntity } from "./application.entity";

import { JoinClubDto } from "./dto/join-club.dto";

@Injectable({scope:Scope.DEFAULT})
export class ApplicationService {
    constructor(@InjectRepository(ApplicationEntity) private readonly applicationRepository: Repository<ApplicationEntity>){}

    async saveApplication(dto:JoinClubDto):Promise<any> {
        return await this.applicationRepository.save(dto)
    }
}
