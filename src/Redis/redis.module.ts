import { Module } from "@nestjs/common";
import { Redis } from 'ioredis'
import { ConfigService } from "@nestjs/config";
import { RedisService } from "./redis.service";


@Module({
    providers:[
    {
        provide:'REDIS_CLIENT',
        useFactory:(configService:ConfigService)=>{
            const client = new Redis({
                port:configService.get('REDIS_PORT',6379),
                host:configService.get('REDIS_HOST','localhost'),
                db:0
            })
            client.on('error', (err) => console.error('Redis Client Error', err));
            return client;
        },
        inject:[ConfigService]
    },
        RedisService
    ],
    exports:[RedisService,'REDIS_CLIENT']

})
export class RedisModule {}