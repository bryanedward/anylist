import { Query, Resolver } from '@nestjs/graphql';
import { LogsUserService } from './logs-user.service';
import { Logs } from './entities/logUser.entity';

@Resolver(Logs)
export class LogsUserResolver {
  constructor(private readonly logsUserService: LogsUserService) {}

  @Query(() => [Logs], { name: 'findalllogs', defaultValue: 'Logs' })
  async logfindall(): Promise<Logs[]> {
    const results = await this.logsUserService.findAll();
    return results;
  }
}
