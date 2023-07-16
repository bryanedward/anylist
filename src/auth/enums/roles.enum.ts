import { registerEnumType } from '@nestjs/graphql';

export enum roles {
  admin = 'admin',
  user = 'user',
  superUser = 'superUser',
}

//enum graphql
registerEnumType(roles, { name: 'roles' });
