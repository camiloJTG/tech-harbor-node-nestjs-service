import { Controller, Get, Query } from '@nestjs/common';
import { LanguageService } from '../services';
import { PaginationDto } from 'src/common/dto';

@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Get()
  findOne(@Query() paginationDto: PaginationDto) {
    return this.languageService.findAll(paginationDto);
  }
}
