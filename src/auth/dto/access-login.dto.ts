import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AccessLoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
