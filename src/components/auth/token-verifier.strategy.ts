import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JwtBearerStrategy } from 'passport-jwt';

@Injectable()
export class TokenVerifier extends PassportStrategy(JwtBearerStrategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'JWT_SECRET',
    })
  }
  async validate(tokenPayload: any) {
    return {
      id: tokenPayload.sub,
      accessLevel: tokenPayload.role,
    };
  }
}
