import { get, indexOf, size, some } from 'lodash';
import { enumRoles } from '../enums/roles.enum';
import { User } from 'src/users/entities/user.entity';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  ExecutionContext,
  ForbiddenException,
  createParamDecorator,
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (role: enumRoles[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request: User = ctx.getContext().req.user;
    const data = get(request, 'roles');
    const validate = data.some(({ name }) => name === role[0]);
    if (validate) return request;
    throw new ForbiddenException('solicitada acceso');
  },
);
