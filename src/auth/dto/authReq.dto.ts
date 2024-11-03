import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthReqDto {
  @IsEmail({}, { message: 'invalid email' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
