import { PartialType } from '@nestjs/mapped-types';
import { UserRegisterDto } from 'src/auth/dto/register.dto';

export class UpdateUserDto extends PartialType(UserRegisterDto) {}
