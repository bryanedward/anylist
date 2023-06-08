import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './types/auth-response.types';
import { SignUpInput } from './dto/inputs/signup.input';
import { LoginInput } from './dto/inputs';
import { Req } from '@nestjs/common';
import { Request } from 'express';

type values = {
  req: any;
};

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => AuthResponse)
  async signup(
    @Args('signUpInput') signUpInput: SignUpInput,
  ): Promise<AuthResponse> {
    const results = await this.authService.signup(signUpInput);
    return results;
  }

  @Query(() => AuthResponse)
  async login(
    @Context() context: GraphQLExecutionContext,
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthResponse> {
    const results = await this.authService.login(loginInput);
    return results;
  }
}
