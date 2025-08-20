import { Inject, Injectable, Scope } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable({scope:Scope.DEFAULT})
export class RedisService {
    constructor(@Inject('REDIS_CLIENT') private readonly rdb:Redis){}

    async incrementToken(token:string):Promise<any> {
        try {
            const counter = await this.rdb.get(token)
            if(!counter){
                await this.rdb.set(token,1,'EX',180)
            }
            else {
                await this.rdb.incr(token)
            }
        }
        catch(error){
            const errMsg = error instanceof Error ? error.message : error as string
            throw new Error(`Redis failed: ${errMsg}`)
        }
    }

    async GetTokenCount(token:string):Promise<any> {
        try {
            const counter = await this.rdb.get(token)
            return counter;
        }
        catch(error){
            const errMsg = error instanceof Error ? error.message : error as string
            throw new Error(`Redis failed: ${errMsg}`)
        }
    }

    async IncrementLoginCount(regNo:string):Promise<any> {
        try {
            const counter = await this.rdb.get(regNo)
            if(!counter){
                await this.rdb.set(regNo,1,'EX',3600)
            }
            else {
                await this.rdb.incr(regNo)
            }
        }
        catch(error){
            const errMsg = error instanceof Error ? error.message : error as string
            throw new Error(`Redis failed: ${errMsg}`)
        }
    }

    async GetLoginCount(regNo):Promise<any> {
        try {
            const counter = await this.rdb.get(regNo)
            return counter;
        }
        catch(error){
            const errMsg = error instanceof Error ? error.message : error as string
            throw new Error(`Redis failed: ${errMsg}`)
        }
    } 

    async ResetLoginCount(regNo):Promise<any> {
        try {
            await this.rdb.set(regNo,0)
        }
        catch(error){
            const errMsg = error instanceof Error ? error.message : error as string
            throw new Error(`Redis failed: ${errMsg}`)
        }
    }
}