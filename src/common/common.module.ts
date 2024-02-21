import { Module } from '@nestjs/common';
import { CommonService } from './services';

@Module({
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
