import { Module } from '@nestjs/common';
import { LogsUserService } from './logs-user.service';
import { LogsUserResolver } from './logs-user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logs } from './entities/logUser.entity';

@Module({
  providers: [LogsUserResolver, LogsUserService],
  imports: [TypeOrmModule.forFeature([Logs])],
  exports: [LogsUserService],
})
export class LogsUserModule {}
