import { BadRequestException, Body, Controller, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserLoginDto, VerifyOtpDto } from './user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { };

    //user create controller
    @Post()
    @HttpCode(201)
    async create(@Body() createUserDto: CreateUserDto) {

        const response = await this.userService.createUser(createUserDto);

        if (response === 'OK') {
            return {
                msg: "Otp sent to your mail",
                code: 201,
                otp_length: 6,
                timer: 180,
                email: createUserDto.email
            }
        } else {
            throw new BadRequestException({
                msg: 'User already exist',
                code: 400
            })
        }



    }



    //OTP verify controller
    @Post('/verify/otp')
    @HttpCode(201)
    async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {

        const response = await this.userService.verifyOtp(verifyOtpDto);
        if (response?.code === 400) {
            throw new BadRequestException({
                msg: response.msg,
                code: 400
            })
        } else {
            return response;
        }


    }


    //user login
    @Post('/signin')
    @HttpCode(201)
    async userLogin(@Body() userLoginDto: UserLoginDto) {
        const response = await this.userService.userLogin(userLoginDto);
       
        if (response?.code === 201) {
             console.log('done 201')
            return {
                access_token: response.access_token,
                id: response.id,
                code: response.code
            }
        } else {
                console.log('done 401')
            throw new UnauthorizedException({
                code: response?.code,
                msg: response?.msg 
            })
 
        }
    } 

} 
