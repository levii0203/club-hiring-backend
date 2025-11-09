import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsEnum, MinLength, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Double } from 'typeorm';

export class JoinClubDto {
    @IsString()
    @IsNotEmpty()
    id: string 

    @IsString()
    @IsNotEmpty()
    club_id: string
    
    @IsString()
    @IsNotEmpty()
    full_name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    @MinLength(10, {message: 'invalid phone number'})
    phone_number: string

    @IsString()
    @IsNotEmpty()
    academic_year: string

    @IsString()
    @IsNotEmpty()
    field_of_study: string

    @IsString()
    @IsOptional()
    @Type(()=>Double)
    gpa: number

    @IsString()
    @IsNotEmpty()
    reason: string

    @IsString()
    @IsOptional()
    experience: string

    @IsString()
    @IsOptional()
    time_commitment: string 

    @IsString()
    @IsOptional()
    goals: string
}