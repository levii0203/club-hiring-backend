import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'clubs' })
export class ClubEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column()
  club_name: string;

  @Column({ default: 0 })
  no_of_members: number;

  @Column({ type: 'text', nullable: true })
  about_us: string;

  @Column({ type: 'simple-array', nullable: true })
  requirements: string[];

  @Column({ type: 'simple-array', nullable: true })
  member_benefits: string[];

  @Column({ type: 'varchar', nullable: true })
  meeting_mode: string;

  @Column({ type: 'json', nullable: true })
  recent_activities: {
    name: string;
    date: string; // ISO date string
    description: string;
  }[];

  @Column({ type: 'json', nullable: true })
  leadership_team: {
    name: string;
    role: string;
  }[];

  @Column({ type: 'json', nullable: true })
  upcoming_events: {
    name: string;
    date: string; // ISO date string
    location: string;
  }[];

  @Column({ type: 'varchar', nullable: true })
  location: string;

  @Column({ type: 'simple-array', nullable: true })
  interests_and_skills: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  updated_at: Date;
}
