import { IsString, IsOptional, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

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


  @ApiProperty({ example: 'hsbfhdsfgyggfiwehfudhs', required:false })
  @IsOptional()
  @IsString()
  FCMtoken?: string;
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
  @IsOptional()
  @IsString()
  FCMtoken?: string;


}
