import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationEntity } from "./application.entity";
import { ClubEntity } from "./club.entity";
import { JwtService } from "@nestjs/jwt";
import { MemberService } from "./member.service";
import { ClubService } from "./club.service";
import { RedisService } from "src/Redis/redis.service";
import { JwtModule } from "@nestjs/jwt";
import { RedisModule } from "src/Redis/redis.module";
import { ClubController } from "./club.controller";
import { UserModule } from "src/User/user.module";
import { MemberEntity } from "./member.entity";
import { ApplicationService } from "./application.service";
@Module({
    imports:[
        TypeOrmModule.forFeature([ClubEntity, MemberEntity, ApplicationEntity]),
        RedisModule,
        UserModule,
        JwtModule.register({
            secret:'clubhiring',
            signOptions: {
                expiresIn:180
            }
        }),
    ],
    controllers: [ClubController],
    providers:[ClubService, RedisService, JwtService, MemberService, ApplicationService],
    exports:[ClubService]
})
export class ClubModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {}
}
