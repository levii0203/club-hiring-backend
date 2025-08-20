import { MiddlewareConsumer, Module , NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { JwtService , JwtModule} from '@nestjs/jwt';
import { UserController } from "./user.controller";
import { AdminController } from "./admin.controller";
import { UserService } from "./user.service";
import { RedisModule } from "src/Redis/redis.module";
import { RedisService } from "src/Redis/redis.service";
import { LoginMiddleware } from "./user.middleware";


@Module({
    imports:[
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            secret:'clubhiring',
            signOptions: {
                expiresIn:180
            }
        }),
        RedisModule
    ],
    controllers:[UserController, AdminController],
    providers:[UserService, JwtService, RedisService],
    exports:[UserService]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoginMiddleware)
            .forRoutes('v1/users/login')
    }
}