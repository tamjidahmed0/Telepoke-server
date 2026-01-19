import { IsString, IsOptional, IsNotEmpty, IsEmail, IsArray, IsDate, isEmail, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateUserDto {
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  profilePhotoUrl?: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  lastSeen?: Date;

  @IsOptional()
  @IsArray()
  blockedUsers?: string[];

  @IsNotEmpty()
  @IsString()
  FCMtoken: string;
}

export class VerifyOtpDto {
  @IsEmail()
  email: string;

  @IsNumber()
  otp: number
}


export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;


  @IsNotEmpty()
  @IsString()
  FCMtoken: string;


}
