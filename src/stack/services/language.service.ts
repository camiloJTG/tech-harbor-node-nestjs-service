import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from '../entities';
import { PaginationDto } from 'src/common/dto';
import { CommonService } from 'src/common/services';
import { PaginationResp } from 'src/common/interfaces';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
    private readonly commonService: CommonService,
  ) {}

  async findAll({ limit = 10, offset = 0 }: PaginationDto) {
    try {
      const currentPage = offset <= 1 ? 1 : offset;
      const effectiveOffset = offset <= 1 ? 0 : offset;

      const [data, total] = await Promise.all([
        this.languageRepository.find({
          take: limit,
          skip: effectiveOffset,
        }),
        this.languageRepository.count(),
      ]);

      if (data.length <= 0) throw new NotFoundException([]);
      const resp: PaginationResp = { data, total, currentPage };
      return resp;
    } catch (error) {
      this.commonService.handlerError(error);
    }
  }

  async findLanguage(id: string) {
    try {
      const language = await this.languageRepository.findOne({ where: { id } });
      if (!language) throw new NotFoundException('User not found');
      return language;
    } catch (error) {
      this.commonService.handlerError(error);
    }
  }
}
