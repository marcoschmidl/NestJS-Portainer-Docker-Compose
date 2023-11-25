import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly firstname: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly lastname: string;

    @IsString()
    @IsEmail()
    @MaxLength(30)
    @IsOptional()
    readonly email: string;

    @IsString()
    @MaxLength(30)
    @IsOptional()
    @IsPhoneNumber()
    readonly phone: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly plate: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly number: string
}