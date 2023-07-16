import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { rolesArgs } from './dto/args/roles.args';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll(@Args() validate: rolesArgs) {
    console.log(
      '🚀 ~ file: users.resolver.ts:12 ~ UsersResolver ~ findAll ~ validate:',
      validate,
    );
    return this.usersService.findAll();
  }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.findOne(id);
  // }

  @Mutation(() => User)
  blockUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.block(id);
  }
}
