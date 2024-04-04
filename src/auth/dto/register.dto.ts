import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  IsArray,
} from 'class-validator';

import { RoleEnum } from '../../enums/role.enum';

export class UserRegisterDto {

  @IsString()
  @IsNotEmpty()
  @Length(0, 32)
  FirstName: string;

  @IsNotEmpty()
  @Length(0, 64)
  LastName: string;


  @IsEmail()
  @IsNotEmpty()
  @Length(0, 128)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 64)
  password: string;

  @IsEnum(RoleEnum)
  @IsOptional()
  role: RoleEnum;
}
