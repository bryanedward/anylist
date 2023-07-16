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
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { CurrentUser } from './decorators/user.decorators';
import { User } from 'src/users/entities/user.entity';
import { roles } from './enums/roles.enum';

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

  @Query(() => AuthResponse, {
    description: 'login user added token for header',
  })
  async login(
    @Context() context: GraphQLExecutionContext,
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthResponse> {
    const results = await this.authService.login(loginInput);
    return results;
  }

  @Query(() => AuthResponse, { name: 'revalite' })
  @UseGuards(JwtAuthGuard)
  revalidateToken(@CurrentUser(roles.admin) user: User): AuthResponse {
    return this.authService.revalidateToken(user);
  }
}
