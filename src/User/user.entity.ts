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
    @Column({type:'varchar',length:255, nullable: true, default: ''})
    registration_number: string;

    @PrimaryColumn({type:'varchar'})
    email: string;

    @Column()
    @Exclude()
    password: string

    @Column("text", { array: true, default: '{}' })
    in_clubs: string[]; 

    @Column()
    phone_number: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ default: true })
    looking_for_club: boolean;

    @Column({ type: 'enum', enum: ROLE, default: ROLE.USER })
    role: ROLE

    @Column({ nullable: true })
    club_name: string;

    @Column({ nullable:true })
    club: string

    @Column({type:'enum', enum:CLUB_ROLE, default:CLUB_ROLE.NONE})
    club_role: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Exclude()
    created_at: Date;


    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Exclude()
    updated_at: Date;
}