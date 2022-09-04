import {
  Controller,
  Request,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  UseGuards,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('register')
  @HttpCode(200)
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService
      .create(registerUserDto)
      .then((response) => {
        return response
          ? { message: 'User Created', statusCode: 200 }
          : new BadRequestException();
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
