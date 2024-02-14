import { ApiProperty } from '@nestjs/swagger';
import { UserRegisterDoc } from './register.doc';
import { FileDoc } from './files.doc';

export class CreatedUserDoc extends UserRegisterDoc {
  @ApiProperty({
    type: Number,
    description: 'Unique identificator for an user.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: Date,
    description: 'When an user was created.',
    example: '2024-02-14',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'When an user was updated.',
    example: '2024-02-14',
  })
  updatedAt: Date;

  @ApiProperty({
    type: Date,
    description: 'When an user was deleted.',
    example: ' 2024-02-14 14:16:32.594761',
  })
  deletedAt: Date;

  @ApiProperty({
    description: 'The uploaded file.',
    type: FileDoc,
  })
  file: FileDoc;
}
