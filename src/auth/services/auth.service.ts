import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CommonService } from 'src/common/services';
import { AccountService } from '../services';
import { AccessLoginDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly commonService: CommonService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email }: AccessLoginDto) {
    try {
      const account = await this.accountService.findOne(email, 'email');
      if (!account) throw new UnauthorizedException('Invalid credentials');
      return { token: this.jwtService.sign({ sub: account.id }) };
    } catch (error) {
      this.commonService.handlerError(error);
    }
  }
}
