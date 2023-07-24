import { Module } from '@nestjs/common';
import { LogsUserService } from './logs-user.service';
import { LogsUserResolver } from './logs-user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogUser } from './entities/logUser.entity';

@Module({
  providers: [LogsUserResolver, LogsUserService],
  imports: [TypeOrmModule.forFeature([LogUser])],
})
export class LogsUserModule {}
