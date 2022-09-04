
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { env } from '../env/env.constants';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async isValidUser(id: string): Promise<boolean> {
    // check if user still exists
    const user = await this.userService.findOne(id);
    return user ? true : false;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findOne({ where: { username: loginUserDto.username } });

    if (user && await bcrypt.compare(loginUserDto.password, user.password)) {
      const payload = { displayName: user.displayName, sub: user.id };
      return {
        token: this.jwtService.sign(payload, { secret: env.JWT_SECRET, expiresIn: '7d' }),
      };
    }
    throw new HttpException('Incorrect username or password', HttpStatus.NOT_FOUND)
  }
}
