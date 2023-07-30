import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.types';
import { LoginInput } from './dto/inputs';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'typeorm';
import { get, omit } from 'lodash';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private getJwtToken(userId: ObjectId) {
    return this.jwtService.sign({ id: userId });
  }

  async signup(params: SignUpInput): Promise<AuthResponse> {
    const results = await this.usersService.create(params);

    const token = this.getJwtToken(results._id);

    return {
      user: results,
      token: token,
    };
  }

  async login(params: LoginInput): Promise<AuthResponse> {
    const results = await this.usersService.findOneByEmail(params.email);
    const validatePassword = bcrypt.compareSync(
      params.password,
      results.password,
    );
    if (!validatePassword) {
      throw new BadRequestException('Email / Password do not match');
    }

    const token = this.getJwtToken(results._id);

    return {
      user: results,
      token,
    };
  }

  async validateUser(id: string) {
    const user = await this.usersService.findOneById(id);
    const result = omit(user, ['password']);
    if (!get(result, 'isActive')) {
      throw new UnauthorizedException('user not authorizate');
    }
    return result;
  }

  revalidateToken(user: User): AuthResponse {
    const token = this.getJwtToken(user._id);
    return {
      user,
      token,
    };
  }
}
