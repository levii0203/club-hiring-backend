import { 
  IsString, 
  IsOptional, 
  IsNumber, 
  IsArray, 
  ValidateNested, 
  IsDateString 
} from 'class-validator';
import { Type } from 'class-transformer';

export class RecentActivityDto {
  @IsString()
  name: string;

  @IsDateString()
  date: string;

  @IsString()
  description: string;
}

export class LeadershipMemberDto {
  @IsString()
  name: string;

  @IsString()
  role: string;
}

export class UpcomingEventDto {
  @IsString()
  name: string;

  @IsDateString()
  date: string;

  @IsString()
  location: string;
}

export class ClubRegisterDto {
  @IsString()
  id: string;

  @IsString()
  club_name: string;

  @IsOptional()
  @IsNumber()
  no_of_members?: number;

  @IsOptional()
  @IsString()
  about_us?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  member_benefits?: string[];

  @IsOptional()
  @IsString()
  meeting_mode?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecentActivityDto)
  recent_activities?: RecentActivityDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LeadershipMemberDto)
  leadership_team?: LeadershipMemberDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpcomingEventDto)
  upcoming_events?: UpcomingEventDto[];

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests_and_skills?: string[];
}

export class UpdateClubDto {
  @IsOptional()
  @IsString()
  club_name?: string;

  @IsOptional()
  @IsNumber()
  no_of_members?: number;

  @IsOptional()
  @IsString()
  about_us?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  member_benefits?: string[];

  @IsOptional()
  @IsString()
  meeting_mode?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecentActivityDto)
  recent_activities?: RecentActivityDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LeadershipMemberDto)
  leadership_team?: LeadershipMemberDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpcomingEventDto)
  upcoming_events?: UpcomingEventDto[];

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests_and_skills?: string[];
}
