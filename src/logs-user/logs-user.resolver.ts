import { Resolver } from '@nestjs/graphql';
import { LogsUserService } from './logs-user.service';

@Resolver()
export class LogsUserResolver {
  constructor(private readonly logsUserService: LogsUserService) {}
}
