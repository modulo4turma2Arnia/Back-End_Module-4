import { ApiProperty } from '@nestjs/swagger';
import { CreateJewelryDoc } from './create-jewelry.doc';
import { FileDoc } from 'src/auth/docs/files.doc';

export class CreatedJewelryDoc extends CreateJewelryDoc {
  @ApiProperty({
    type: Number,
    description: 'Unique identificator for an jewelry.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: Date,
    description: 'When an jewelry was created.',
    example: '2024-02-14',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'When an jewelry was updated.',
    example: '2024-02-14',
  })
  updatedAt: Date;


  @ApiProperty({
    description: 'The uploaded file.',
    type: FileDoc,
  })
  file: FileDoc;
}
