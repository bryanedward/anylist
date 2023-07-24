import { Test, TestingModule } from '@nestjs/testing';
import { LogsUserResolver } from './logs-user.resolver';
import { LogsUserService } from './logs-user.service';

describe('LogsUserResolver', () => {
  let resolver: LogsUserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogsUserResolver, LogsUserService],
    }).compile();

    resolver = module.get<LogsUserResolver>(LogsUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
