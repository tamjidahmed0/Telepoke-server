import { IsString, IsOptional, IsNotEmpty, IsEmail, IsArray, IsDate, isEmail, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ example: 'Tamjid' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456' })
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

  @ApiProperty({ example: 'hsbfhdsfgyggfiwehfudhs' })
  @IsNotEmpty()
  @IsString()
  FCMtoken: string;
}

export class VerifyOtpDto {

  @ApiProperty({ example: 'user@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 256422 })
  @IsNumber()
  otp: number
}


export class UserLoginDto {
  @ApiProperty({ example: 'user@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'hsbfhdsfgyggfiwehfudhs' })
  @IsNotEmpty()
  @IsString()
  FCMtoken: string;


}
