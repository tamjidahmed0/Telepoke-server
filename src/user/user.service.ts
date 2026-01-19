import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UserLoginDto, VerifyOtpDto } from './user.dto';
import { RedisService } from '../redis/redis.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly redisService: RedisService,
    private jwtService: JwtService
  ) { }


  //create user
  async createUser(createUserDto: CreateUserDto) {

    try {

      const check_user_exist = await this.userModel.findOne({ email: createUserDto.email });

      if (check_user_exist === null) {

        // password hash
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const tempUser = {
          ...createUserDto,
          password: hashedPassword,
        };

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const response = await this.redisService.setObject(`${createUserDto.email}`, { ...tempUser, otp }, 300);


        return response

      } else {
        return { msg: 'User already exist' }
      }

    } catch (error) {
      throw error
    }

  }


  //verify otp service
  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    try {
      const getObject = await this.redisService.getObject(verifyOtpDto.email);

      if (getObject === null) {
        return {
          msg: "Otp expired",
          code: 400
        }
      }

      if (getObject.otp === verifyOtpDto.otp.toString()) {

        const user_save = await this.userModel.create(getObject);
        const access_token = this.jwtService.sign({
          id: user_save._id
        })

        if (user_save) {
          await this.redisService.del(verifyOtpDto.email);
          return {
            msg: 'Verified',
            code: 201,
            access_token
          }
        }


      } else {
        return {
          msg: "Not matched",
          code: 400
        }
      }
    } catch (error) {
      throw error
    }

  }


  //login user
  async userLogin(userLoginDto: UserLoginDto) {

    const check_user = await this.userModel.findOne({ email: userLoginDto.email });


    if (check_user !== null) {

      const verify_pass = await bcrypt.compare(userLoginDto.password, check_user.password)

      if (verify_pass) {

        const access_token = this.jwtService.sign({
          id: check_user._id
        })

        await this.userModel.findOneAndUpdate({ email: userLoginDto.email },
          { FCMtoken: userLoginDto.FCMtoken }
        );

        return {
          access_token,
          id: check_user._id,
          code: 201
        }
      } else {
        return {
          code: 401,
          msg: 'Email or password wrong'
        }
      }

    } else {
      return {
        code: 401,
        msg: 'Email or password wrong'
      }
    }



  }



}
