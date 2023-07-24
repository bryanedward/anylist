import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { LogUser } from './entities/logUser.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LogUserInput } from './dto/create-log-user.input';

@Injectable()
export class LogsUserService {
  constructor(
    @InjectRepository(LogUser)
    private logUserRepository: MongoRepository<LogUser>,
  ) {}

  async create(logUserInput: LogUserInput) {
    try {
      const logs = this.logUserRepository.create(logUserInput);
      return logs;
    } catch (error) {}
  }
}
