import { Injectable, UnauthorizedException } from '@nestjs/common'
import { DatabaseService } from '../../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { SignupInput } from './dto/register.dto'
import { SigninInput } from './dto/login.dto'

@Injectable()
export class AccessService {
  login(payload: SigninInput) {
    throw new Error('Method not implemented.')
  }
  register(payload: SignupInput) {
    throw new Error('Method not implemented.')
  }
  constructor(
    private readonly db: DatabaseService,
    private readonly tokenService: JwtService,
  ) { }

  async createAccount(payload: SignupInput) {
    const securePass = await bcrypt.hash(payload.password, 10)

    const newUser = await this.db.user.create({
      data: {
        email: payload.email,
        password: securePass,
        role: payload.role,
      },
    })

    return {
      message: 'Account successfully created',
      user: newUser,
    }
  }

  async authorize(payload: SigninInput) {
    const foundUser = await this.db.user.findUnique({
      where: { email: payload.email },
    })

    const isValid =
      foundUser && (await bcrypt.compare(payload.password, foundUser.password))

    if (!isValid) {
      throw new UnauthorizedException('Login or password is incorrect')
    }

    const jwtToken = await this.tokenService.signAsync({
      sub: foundUser.id,
      role: foundUser.role,
    })

    return {
      access_token: jwtToken,
    }
  }
}
