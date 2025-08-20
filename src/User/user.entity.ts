import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export enum CLUB_ROLE {
    PRESIDENT = 'president',
    VICE_PRESIDENT = 'vice_president',
    TECH_LEAD = 'tech_lead',
    STUDENT_COORDINATOR = 'student_coordinator',
    NONE = 'none'
}

export enum ROLE {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryColumn({type:'varchar',length:255})
    registration_number: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    batch: number;

    @Column({ type: 'array', default: '' }) 
    in_clubs: string[]; 

    @Column()
    phone_number: string;

    @Column()
    first_name: string;

    @Column({ nullable: true })
    middle_name: string;

    @Column()
    last_name: string;

    @Column({ default: true })
    looking_for_club: boolean;

    @Column({ type: 'enum', enum: ROLE, default: ROLE.USER })
    role: ROLE;

    @Column({type:'array',default:[]})
    applications:Array<string>

    @Column({ default: 'None' })
    club_name: string;

    @Column({default: 'None'})
    club: string

    @Column({type:'enum', enum:CLUB_ROLE, default:CLUB_ROLE.NONE})
    club_role: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Exclude()
    created_at: Date;
}