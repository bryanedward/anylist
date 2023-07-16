import { get, some } from 'lodash';
import { roles } from '../enums/roles.enum';
import { User } from 'src/users/entities/user.entity';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  ExecutionContext,
  ForbiddenException,
  createParamDecorator,
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (role: roles, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request: User = ctx.getContext().req.user;
    const data = get(request, 'roles');

    if (some(data, { role })) return request;

    throw new ForbiddenException('solicitada acceso');
  },
);
