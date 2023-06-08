import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthResolver, AuthService],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
