import { BadRequestException, Body, Controller, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserLoginDto, VerifyOtpDto } from './user.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';



@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { };

    //user create controller
    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Create new user and send OTP' })
    @ApiResponse({
        status: 201,
        description: 'OTP sent to user email',
        schema: {
            example: {
                msg: 'Otp sent to your mail',
                code: 201,
                otp_length: 6,
                timer: 180,
                email: 'user@gmail.com',
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'User already exists',
        schema: {
            example: {
                statusCode: 400,
                message: 'User already exists',
                error: 'Bad Request',
            },
        },
    })
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }




    @Post('/verify/otp')
    @HttpCode(201)
    @ApiOperation({ summary: 'Verify OTP and create user' })
    @ApiResponse({
        status: 201,
        description: 'OTP verified successfully',
        schema: {
            example: {
                msg: 'Verified',
                access_token: 'jwt.token.here',
                id: '64f1abc123',
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'OTP expired or not matched',
        schema: {
            example: {
                statusCode: 400,
                message: 'OTP expired',
                error: 'Bad Request',
            },
        },
    })
    async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
        return this.userService.verifyOtp(verifyOtpDto);
    }











    @Post('/signin')
    @HttpCode(201)
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({
        status: 201,
        description: 'Login successful',
        schema: {
            example: {
                access_token: 'jwt.token.here',
                id: '64f1abc123',
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Invalid email or password',
        schema: {
            example: {
                statusCode: 401,
                message: 'Email or password wrong',
                error: 'Unauthorized',
            },
        },
    })
    async userLogin(@Body() userLoginDto: UserLoginDto) {
        return this.userService.userLogin(userLoginDto);
    }





} 
