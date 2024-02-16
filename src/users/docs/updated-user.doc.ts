import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from 'src/enums/role.enum';

export class UpdatedUserDoc {
  @ApiProperty({
    type: Number,
    description: 'Unique identificator for an user.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'first name registered.',
    example: 'Guilherme atualizado',
  })
  FirstName: string;

  @ApiProperty({
    type: String,
    description: 'Last name registered ',
    example: 'Bernardes',
  })
  LastName: string;

  @ApiProperty({
    type: String,
    description: 'registered email',
    example: 'guilherme@email.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Link to the profile image hosted on Firebase',
    example:
      'https://firebasestorage.googleapis.com/v0/b/modulo4-4f6b2.appspot.com/o/1706915097376.airfrier?alt=media&token=a92c1548-bdb4-4a11-9791-c885cc71c4a8',
  })
  profileimage: string;

  @ApiProperty({
    type: RoleEnum,
    enum: RoleEnum,
    description: 'Role for an user to validate permissions',
  })
  role: RoleEnum;

  @ApiProperty({
    type: Number,
    description: 'User credit balance',
    example: 0,
  })
  credits: number;

  @ApiProperty({
    type: Date,
    description: 'When an user was created.',
    example: '2024-02-15T17:59:29.129Z',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'When an user was updated.',
    example: '2024-02-15',
  })
  updatedAt: Date;

  @ApiProperty({
    type: Date,
    description: 'When an user was deleted.',
    example: 'null',
  })
  deletedAt: null;
}
