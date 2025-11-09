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

    @IsBoolean()
    looking_for_club: boolean;

    @IsString()
    @IsOptional()
    registration_number: string;

    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsEnum(ROLE)
    @IsOptional()
    role?: ROLE; 
}