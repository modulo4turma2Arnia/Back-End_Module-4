import { ApiProperty } from '@nestjs/swagger';
import { CreateJewelryDoc } from './create-jewelry.doc';

export class CreatedJewelryDoc extends CreateJewelryDoc {
  @ApiProperty({
    type: String,
    description: 'Type of jewelry.',
    example: 'Joia da Mente ',
    required: true,
  })
  type: string;

  @ApiProperty({
    type: String,
    description: 'Habilities or features of the jewelry.',
    example:
      '(Comunicação) O poder dessa joia está na possibilidade de conseguir acessar diretamente os pensamentos de qualquer ser, transformando ideias em palavras, com assertividade na transmissão e receptividade das informações.',
    required: true,
  })
  habilities: string;

  @ApiProperty({
    type: String,
    description: 'Link to the image hosted on Firebase',
    example:
      'https://firebasestorage.googleapis.com/v0/b/modulo4-4f6b2.appspot.com/o/1707403167148.alma?alt=media&token=6619158c-c69f-46df-86db-a7125b739e83',
  })
  image: string;

  @ApiProperty({
    type: Number,
    description: 'Unique identificator for an jewelry.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: Date,
    description: 'When an jewelry was created.',
    example: '2024-02-15T17:59:29.129Z',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'When an jewelry was updated.',
    example: '2024-02-15',
  })
  updatedAt: Date;

  // @ApiProperty({
  //   type: Date,
  //   description: 'When an jewelry was deleted.',
  //   example: ' 2024-02-14 14:16:32.594761',
  // })
  // deletedAt: Date;
}
