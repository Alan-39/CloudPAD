
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { environment } from '../env/environment.constants';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    if (await this.authService.isValidUser(payload.sub)) {
      return { id: payload.sub, displayName: payload.displayName };
    }
    throw new UnauthorizedException();
  }
}