import { registerEnumType } from '@nestjs/graphql';

export enum enumRoles {
  admin = 'admin',
  user = 'user',
  superUser = 'superUser',
}

//enum graphql
registerEnumType(enumRoles, { name: 'roles' });
