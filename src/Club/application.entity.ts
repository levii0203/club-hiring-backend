import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ClubEntity } from './club.entity'; // assuming you already have this
import { Exclude } from 'class-transformer';

@Entity({ name: 'application' })
export class ApplicationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ClubEntity, (club) => club.id, { eager: true, onDelete: 'CASCADE' })
    club: ClubEntity;

    @Column({ type: 'varchar' })
    club_id: string;

    @Column({ type: 'varchar' })
    full_name: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar', length: 20 })
    phone_number: string;

    @Column({ type: 'varchar' })
    academic_year: string;

    @Column({ type: 'varchar' })
    field_of_study: string;

    @Column({ type: 'float', nullable: true })
    gpa: number;

    @Column({ type: 'text' })
    reason: string;

    @Column({ type: 'text', nullable: true })
    experience: string;

    @Column({ type: 'varchar', nullable: true })
    time_commitment: string;

    @Column({ type: 'text', nullable: true })
    goals: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Exclude()
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Exclude()
    updated_at: Date;
}
