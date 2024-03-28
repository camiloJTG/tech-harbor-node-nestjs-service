import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CommonService } from 'src/common/services';
import { Profile } from '../interfaces';

@Injectable()
export class GithubService {
  private BASE_URL = this.configService.get<string>('CLIENT_GITHUB_BASE_URL');

  constructor(
    private readonly configService: ConfigService,
    private readonly commonService: CommonService,
  ) {}

  async GetProfile(id: string) {
    try {
      const data = await fetch(`${this.BASE_URL}/user/${id}`);
      if (!data.ok) throw new Error('Error fetching github api');
      const profile: Profile = await data.json();
      return profile;
    } catch (error) {
      this.commonService.handlerError(error);
    }
  }
}
