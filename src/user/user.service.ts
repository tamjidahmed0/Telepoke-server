import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UserLoginDto, VerifyOtpDto } from './user.dto';
import { RedisService } from '../redis/redis.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';





@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly redisService: RedisService,
    private jwtService: JwtService,
    private readonly mailService: MailService
  ) { }


  //create user service
  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const tempUser = {
      ...createUserDto,
      password: hashedPassword,
    };

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store in Redis with TTL 300s (5 min)
    await this.redisService.setObject(`${createUserDto.email}`, { ...tempUser, otp }, 300);

    // Send OTP via email
    const subject = 'Your OTP Code';
    await this.mailService.sendMail(createUserDto.email, subject, 'otp', {
      name: createUserDto.name,
      otp,
      expiry: '5 minutes',

    });

    return {
      msg: 'Otp sent to your mail',
      code: 201,
      otp_length: 6,
      timer: 180,
      email: createUserDto.email,
    };
  }






  //verify otp service
  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const cachedUser = await this.redisService.getObject(verifyOtpDto.email);

    if (!cachedUser) {
      throw new BadRequestException('OTP expired');
    }

    if (cachedUser.otp !== verifyOtpDto.otp.toString()) {
      throw new BadRequestException('OTP not matched');
    }

    // Create user
    const savedUser = await this.userModel.create(cachedUser);


    // Generate JWT
    const access_token = this.jwtService.sign({ id: savedUser._id });

    // Delete OTP from Redis
    await this.redisService.del(verifyOtpDto.email);


    // Send welcome email
    const subject = 'Welcome to TelePoke!';
    await this.mailService.sendMail(savedUser.email, subject, 'welcome', { name: savedUser.name })

    return {
      msg: 'Verified',
      access_token,
      id: savedUser._id,
    };
  }







  //user login service
  async userLogin(userLoginDto: UserLoginDto) {
    const user = await this.userModel.findOne({ email: userLoginDto.email });

    if (!user) {
      throw new UnauthorizedException('Email or password wrong');
    }

    const isValid = await bcrypt.compare(userLoginDto.password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Email or password wrong');
    }

    // Update FCM token if provided
    if (userLoginDto.FCMtoken) {
      await this.userModel.updateOne(
        { email: userLoginDto.email },
        { FCMtoken: userLoginDto.FCMtoken },
      );
    }

    const access_token = this.jwtService.sign({ id: user._id });

    return {
      access_token,
      id: user._id,
    };
  }





}
