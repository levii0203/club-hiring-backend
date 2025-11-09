import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './User/user.entity';
import { UserModule } from './User/user.module';
import { ClubEntity } from './Club/club.entity';
import { ClubModule } from './Club/club.module';
import { MemberEntity } from './Club/member.entity';
import { ApplicationEntity } from './Club/application.entity';

console.log('DB password:', process.env.POSTGRES_PASSWORD);

@Module({
  imports: [
  UserModule,
  ClubModule,
  ConfigModule.forRoot({
      envFilePath:['.env'],
      isGlobal: true
  }),
   TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST'),
        port: config.get<number>('POSTGRES_PORT'),
        username: config.get<string>('POSTGRES_USERNAME'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DATABASE'),
        entities: [UserEntity, ClubEntity, MemberEntity, ApplicationEntity],
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
