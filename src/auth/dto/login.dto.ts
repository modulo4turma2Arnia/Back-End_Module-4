import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class LoginDTO {
  // decorator @IsEmail() valida se o valor na propriedade é um e-mail.
  @IsEmail()
  // O decorator @IsNotEmpty() garante que a propriedade não seja vazia.
  @IsNotEmpty()
  email: string;

  // O decorator @IsString() valida se o valor a propriedade é uma string.
  @IsString()
  @IsNotEmpty()
  password: string;
}
