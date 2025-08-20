import { Entity , Column , PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

export interface Departments {
    name:string
    seats_left:number
}

@Entity({name:'clubs'})
export class ClubEntity {
    @PrimaryGeneratedColumn()
    id:string

    @Column()
    club_name:string

    @Column({type:'array',default:[]})
    club_members:Array<string>

    @Column({type:'string',default:''})
    club_president:string

    @Column({type:'string',default:''})
    club_president_email:string

    @Column({type:'string',default:''})
    club_vice_president:string

    @Column({default:0})
    no_of_members:number
    
    @Column({default:''})
    student_coordinator:string

    @Column({default:''})
    student_coordinator_email:string

    @Column({default:''})
    student_coordinator_phone_number:string

    @Column({default:true})
    hiring:boolean

    @Column({default:0})
    hired_this_month:number

    @Column({type:'array',default:[]})
    available_departments: Array<string>

    @Column({default:0})
    available_seat:number

    @Column()
    registered_admin:string

    @Column()
    registered_admin_email:string

    @Column({default:''})
    avatar_url:string

    @Column({type:'timestamp',default:''})
    registration_deadline:Date

    @Column({default:''})
    official_website_url:string

    @Column({type:'array',default:[]})
    other_websites:Array<string>

    @Column({default:0})
    no_of_hackathons:number

    @Column({type:'array',default:[]})
    club_admins:Array<string>

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Exclude()
    created_at: Date;

    @Column({type: 'timestamp',default: ()=>'CURRENT_TIMESTAMP'})
    @Exclude()
    updated_at:Date
}