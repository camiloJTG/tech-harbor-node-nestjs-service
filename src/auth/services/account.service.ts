import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CommonService } from 'src/common/services';
import { Account } from '../entities';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly commonService: CommonService,
  ) {}

  async findOne(term: string, type: 'id' | 'email') {
    try {
      let closure = {};
      if (type === 'id') closure = { id: term };
      if (type === 'email') closure = { email: term };

      const account = await this.accountRepository.findOne({
        where: closure,
      });
      if (!account) return;
      return account;
    } catch (error) {
      this.commonService.handlerError(error);
    }
  }
}
