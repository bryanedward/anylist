import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.types';
import { LoginInput } from './dto/inputs';
import { log } from 'console';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(params: SignUpInput): Promise<AuthResponse> {
    const results = await this.usersService.create(params);
    return {
      user: results,
      token: 'password',
    };
  }

  async login(params: LoginInput): Promise<AuthResponse> {
    const results = await this.usersService.findOneByEmail(params.email);
    const validatePassword = bcrypt.compareSync(
      params.password,
      results.password,
    );

    return {
      user: results,
      token: 'ok',
    };
  }
}
