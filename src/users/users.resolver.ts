import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { rolesArgs } from './dto/args/roles.args';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CurrentUser } from 'src/auth/decorators/user.decorators';
import { enumRoles } from 'src/auth/enums/roles.enum';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll(
    @Args() validate: rolesArgs,
    @CurrentUser([enumRoles.admin, enumRoles.superUser]) user: User,
  ): Promise<User[]> {
    return this.usersService.findAll(validate.roles);
  }

  @Query(() => User, { name: 'user' })
  findOne(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser([enumRoles.admin, enumRoles.superUser]) user: User,
  ) {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => User, { name: 'blockUser' })
  blockUser(
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser([enumRoles.admin, enumRoles.superUser]) user: User,
  ) {
    console.log(
      '🚀 ~ file: users.resolver.ts:38 ~ UsersResolver ~ updateUserInput:',
      updateUserInput,
    );
    return this.usersService.block(id, updateUserInput);
  }
}
