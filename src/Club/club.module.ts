import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClubEntity } from "./club.entity";
import { ClubService } from "./club.service";
import { RedisService } from "src/Redis/redis.service";
import { RedisModule } from "src/Redis/redis.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([ClubEntity]),
        RedisModule
    ],
    providers:[ClubService, RedisService]
})
export class ClubModule {}