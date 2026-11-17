import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service.js';
import { User } from './entities/user.entity.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'fallback_secret'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION', '1d') as any },
      }),
    }),
  ],
  controllers: [],
  providers: [AuthService],
})
export class AuthModule {}