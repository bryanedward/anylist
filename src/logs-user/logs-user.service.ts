import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { Logs } from './entities/logUser.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LogUserInput } from './dto/create-log-user.input';

@Injectable()
export class LogsUserService {
  constructor(
    @InjectRepository(Logs)
    private logUserRepository: MongoRepository<Logs>,
  ) {}

  async findAll() {
    const pipeline = [
      {
        $lookup: {
          from: 'Users',
          localField: 'userLogs._id',
          foreignField: '_id',

          pipeline: [
            {
              $project: { isActive: 1, fullName: 1, 'roles.name': 1 },
            },
          ],

          as: 'usermodify',
        },
      },
    ];

    try {
      const data = await this.logUserRepository.aggregate(pipeline).toArray();

      return data;
    } catch (error) {}
  }

  async create(logUserInput: LogUserInput) {
    try {
      const logs = this.logUserRepository.save({
        fullname: logUserInput.fullName,
        userLogs: logUserInput.user,
      });

      return logs;
    } catch (error) {}
  }
}
