import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tool } from '../entities';
import { LanguageService } from './language.service';
import { PaginationDto } from 'src/common/dto';
import { CommonService } from 'src/common/services';
import { PaginationResp } from 'src/common/interfaces';

@Injectable()
export class ToolService {
  constructor(
    @InjectRepository(Tool)
    private readonly toolRepository: Repository<Tool>,
    private readonly languageService: LanguageService,
    private readonly commonService: CommonService,
  ) {}

  async findToolsByLanguageId(
    { limit = 10, offset = 0 }: PaginationDto,
    id: string,
  ) {
    try {
      const currentPage = offset <= 1 ? 1 : offset;
      const effectiveOffset = offset <= 1 ? 0 : offset;

      const language = await this.languageService.findLanguage(id);
      const [data, total] = await Promise.all([
        this.toolRepository
          .createQueryBuilder('tool')
          .where('tool.languageId =:id', { id: language.id })
          .take(limit)
          .skip(effectiveOffset)
          .getMany(),
        this.toolRepository
          .createQueryBuilder('tool')
          .where('tool.languageId =:id', { id: language.id })
          .getCount(),
      ]);

      if (data.length <= 0) throw new NotFoundException([]);
      const resp: PaginationResp = { data, total, currentPage };
      return resp;
    } catch (error) {
      this.commonService.handlerError(error);
    }
  }
}
