import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './User/user.entity';
import { UserModule } from './User/user.module';
import { ClubEntity } from './Club/club.entity';
import { ClubModule } from './Club/club.module';

@Module({
  imports: [
  UserModule,
  ClubModule,
  ConfigModule.forRoot({
      envFilePath:['.env'],
      isGlobal: true
  }),
  TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'parth098',
      database:'clubhiring',
      entities:[UserEntity,ClubEntity],
      synchronize: true
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
