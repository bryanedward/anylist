import { ArgsType, Field } from '@nestjs/graphql';
import { roles } from 'src/auth/enums/roles.enum';

@ArgsType()
export class rolesArgs {
  @Field(() => [roles], { nullable: true })
  roles: Array<roles>;
}
