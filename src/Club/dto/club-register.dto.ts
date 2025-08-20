import { IsString , isBoolean , IsNotEmpty , IsOptional, IsBoolean, IsNumber } from "class-validator";

export class ClubRegisterDto {
    @IsString()
    @IsNotEmpty()
    club_name:string

    @IsString()
    @IsNotEmpty()
    registered_admin:string
    
    @IsString()
    @IsNotEmpty()
    registered_admin_email:string

    @IsString()
    @IsOptional()
    avatar_url:string

    @IsString()
    @IsOptional()
    official_website_url:string

    @IsOptional()
    available_departments:Array<string>

    @IsBoolean()
    @IsOptional()
    hiring:boolean

    @IsString()
    @IsOptional()
    student_coordinator_email:string

    @IsString()
    @IsOptional()
    student_coordinator_phone_number:string

    @IsString()
    @IsOptional()
    student_coordinator:string

    @IsString()
    @IsOptional()
    club_president:string
    
    @IsString()
    @IsOptional()
    club_vice_president:string

    @IsNumber()
    @IsOptional()
    no_of_members:number
}