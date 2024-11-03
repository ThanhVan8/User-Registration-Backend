import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { AuthReqDto } from './dto/authReq.dto';

@Controller('user')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginReqDto: AuthReqDto) {
    const foundUser = await this.authService.login(loginReqDto);
    if (!foundUser) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userInfo } = foundUser;

    return {
      message: 'Login successfully',
      data: userInfo,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registerReqDto: AuthReqDto) {
    const foundUser = await this.userService.findByEmail(registerReqDto.email);
    if (foundUser) {
      throw new ConflictException('User already exists');
    }

    const createdUser = await this.authService.register(registerReqDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userInfo } = createdUser;
    return {
      message: 'Register successfully',
      data: userInfo,
    };
  }
}
