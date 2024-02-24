import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ToolService } from '../services';
import { PaginationDto } from 'src/common/dto';

@Controller('tool')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.toolService.findToolsByLanguageId(paginationDto, id);
  }
}
