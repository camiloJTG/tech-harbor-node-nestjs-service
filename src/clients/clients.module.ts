import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '../common/common.module';
import { GithubService } from './services';

@Module({
  imports: [ConfigModule, CommonModule],
  providers: [GithubService],
  exports: [GithubService],
})
export class ClientsModule {}
