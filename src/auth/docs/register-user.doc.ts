import { ApiProperty } from '@nestjs/swagger';
import { FileDoc } from './file.doc';
import { RoleEnum } from 'src/enums/role.enum';

export class UserRegisterDoc {
  @ApiProperty({
    type: String,
    description: 'To register an user needs to pass a name.',
    example: 'Guilherme',
    required: true,
  })
  FirstName: string;

  @ApiProperty({
    type: String,
    description: 'To register an user needs to pass a last name.',
    example: 'Bernardes',
    required: true,
  })
  LastName: string;

  @ApiProperty({
    type: String,
    description:
      'Email to register an user. Needs to be unique on application.',
    example: 'guilherme@email.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    type: FileDoc,
    description: 'Upload image profile.',
    required: true,
  })
  profileImage: FileDoc;

  @ApiProperty({
    type: String,
    description: 'Password for user to login.',
    example: '12345',
    required: true,
  })
  password: string;

  @ApiProperty({
    type: RoleEnum,
    enum: RoleEnum,
    description: 'Role for an user to validate permissions',
  })
  role: RoleEnum;
}
