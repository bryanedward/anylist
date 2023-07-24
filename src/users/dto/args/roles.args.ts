import { ArgsType, Field } from '@nestjs/graphql';
import { enumRoles } from 'src/auth/enums/roles.enum';

@ArgsType()
export class rolesArgs {
  @Field(() => [enumRoles], { nullable: true })
  roles: Array<enumRoles>;
}
