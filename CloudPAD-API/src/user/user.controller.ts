import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  loginAccount(@Body() loginUserDto: LoginUserDto) {
    this.userService
      .verify(loginUserDto)
      .then((response) => {
        return response
          ? { response: 'User Created', status: 200 }
          : { response: 'User already exists!', status: 403 };
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  @Post('register')
  @HttpCode(200)
  registerAccount(@Body() registerUserDto: RegisterUserDto) {
    return this.userService
      .create(registerUserDto)
      .then((response) => {
        return response
          ? { response: 'User Created', status: 200 }
          : { response: 'User already exists!', status: 403 };
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
