import { IsString , IsNotEmpty , IsOptional, IsBoolean} from "class-validator";

export class SaveMemberDto {
    @IsString()
    @IsNotEmpty()
    registration_id:string

    @IsString()
    @IsNotEmpty()
    club_id:string

    @IsString()
    @IsNotEmpty()
    department:string

    @IsBoolean()
    @IsOptional()
    admin:boolean

    @IsString()
    @IsOptional()
    role:string
}