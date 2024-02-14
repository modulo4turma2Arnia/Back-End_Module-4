import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
} from 'class-validator';

import { RoleEnum } from '../../enums/role.enum';

export class UserRegisterDto {
  //  @IsString() valida se o valor atribuído à propriedade é uma string.
  @IsString()
  // @IsNotEmpty() garante que a propriedade não seja vazia.
  //  @Length(0, 64) limita o tamanho da string entre 0 e 64 caracteres.
  @IsNotEmpty()
  @Length(0, 32)
  FirstName: string;

  @IsNotEmpty()
  @Length(0, 64)
  LastName: string;

  // @IsEmail() valida se o valor a propriedade é um e-mail válido.
  @IsEmail()
  //  @IsNotEmpty() garante que a propriedade não seja vazia.
  //  @Length(0, 100) limita o comprimento da string entre 0 e 100 caracteres.
  @IsNotEmpty()
  @Length(0, 128)
  email: string;

  //  @IsString() valida se o valor atribuído à propriedade é uma string.
  @IsString()
  //  @IsNotEmpty() garante que a propriedade não esteja vazia.
  //  @Length(0, 64) limita o comprimento da string entre 0 e 64 caracteres.
  @IsNotEmpty()
  @Length(0, 64)
  password: string;

  //  @IsEnum(RoleEnum) valida se o valor atribuído à propriedade é um dos que existem em  RoleEnum.
  @IsEnum(RoleEnum)
  @IsOptional()
  role: RoleEnum;
}
