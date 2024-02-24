import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Language, Label, Tool } from './entities';
import { LanguageService, ToolService } from './services';
import { LanguageController, ToolController } from './controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Language, Label, Tool]), CommonModule],
  controllers: [ToolController, LanguageController],
  providers: [ToolService, LanguageService],
})
export class StackModule {}
