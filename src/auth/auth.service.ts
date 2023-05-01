import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.types';

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
}
