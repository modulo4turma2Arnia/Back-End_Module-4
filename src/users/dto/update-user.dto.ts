import { PartialType } from '@nestjs/mapped-types';
import { UserRegisterDto } from '../../auth/dto/register.dto';

export class UpdateUserDto extends PartialType(UserRegisterDto) {}
