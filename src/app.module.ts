import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ItemsModule } from './items/items.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LogsUserModule } from './logs-user/logs-user.module';
import { PersonSubscriber } from './users/subscriber/UserSubscriber';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: 'default',
        type: 'mongodb',
        host: configService.get('DATABASEHOST'),
        port: configService.get('DATABASEPORT'),
        username: configService.get('USERNAME'),
        password: configService.get('USERPASSWORD'),
        useNewUrlParser: true,
        autoLoadEntities: true,
        useUnifiedTopology: true,
        entities: [join(__dirname, '**/**.entity(.ts,.js)')],
        subscribers: [PersonSubscriber],
      }),
    }),

    ItemsModule,
    UsersModule,
    AuthModule,
    LogsUserModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
