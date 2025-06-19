import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private configService: ConfigService,
  ) {}

  async validateUser(phone_number: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ where: { phone_number } });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(phone_number: string, password: string): Promise<{ access_token: string }> {
    const user = await this.validateUser(phone_number, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const payload = { user_id: user.user_id, role: user.role };
    return {
      access_token: jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: '1h' }),
    };
  }
}