import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from '../services';
import { AccessLoginDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  findOne(@Body() accessLoginDto: AccessLoginDto) {
    return this.authService.signIn(accessLoginDto);
  }
}
