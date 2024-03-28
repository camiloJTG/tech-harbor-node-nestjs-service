import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ClientsModule } from '../clients/clients.module';
import { CommonModule } from '../common/common.module';
import { AccountService, AuthService } from './services';
import { AuthController } from './controllers';
import { JwtStrategy } from './strategies';
import { Account } from './entities';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES'),
            audience: configService.get<string>('JWT_PAYLOAD_AUD'),
            issuer: configService.get<string>('JWT_PAYLOAD_ISS'),
          },
        };
      },
    }),
    TypeOrmModule.forFeature([Account]),
    CommonModule,
    ConfigModule,
    ClientsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AccountService, JwtStrategy],
})
export class AuthModule {}
