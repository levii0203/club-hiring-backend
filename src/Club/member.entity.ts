import { Entity , Column , PrimaryColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity({name:'members'})
export class MemberEntity {
    @PrimaryColumn({type:'varchar'})
    email:string 

    @PrimaryColumn({type:'varchar'})
    club_id:string

    @Column({type:'varchar', nullable:true})
    department:string

    @Column({type:'varchar', nullable:true})
    role:string

    @Column({default:false})
    admin:boolean

    @Column()
    @Exclude()
    created_at:Date
}