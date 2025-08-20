/* The UserSignUpDto class defines validation rules for user sign up data in a TypeScript application. */
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsEnum, MinLength, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import {ROLE} from "../user.entity"

export class UserSignUpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;

    @IsPhoneNumber("IN", { message: 'Invalid phone number' }) 
    @IsNotEmpty()
    phone_number: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsBoolean()
    looking_for_club: boolean;

    @IsString()
    @IsNotEmpty()
    registration_number: string;

    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsOptional()
    middle_name?: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number) 
    batch: number;

    @IsEnum(ROLE)
    @IsOptional()
    role?: ROLE; 

    @IsString()
    @IsOptional()
    club_name?: string; 
}