import { ApiProperty } from '@nestjs/swagger';
import { CreateJewelryDoc } from './create-jewelry.doc';
import { FileDoc } from 'src/auth/docs/file.doc';

export class UpdatedJewelryDoc {
  @ApiProperty({
    type: String,
    description: 'Type of jewelry.',
    example: 'Joia do tempo',
    required: true,
  })
  type: string;

  @ApiProperty({
    type: String,
    description: 'Habilities or features of the jewelry.',
    example:
      'Foco - Nesta joia está a possibilidade de total domínio sobre a dimensão temporal, aquele que a possui tem a capacidade de lidar com grande volume de demandas dentro dos prazos estabelecidos, mantendo atenção aos detalhes, tendo em vista o alcance de resultados.',
    required: true,
  })
  habilities: string;

  @ApiProperty({
    type: String,
    description: 'Link to the image hosted on Firebase',
    example:
      'https://firebasestorage.googleapis.com/v0/b/modulo4-4f6b2.appspot.com/o/1707403167148.alma?alt=media&token=6619158c-c69f-46df-86db-a7125b739e83',
  })
  image: FileDoc;

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

  @ApiProperty({
    type: Date,
    description: 'When an jewelry was deleted.',
    example: 'null',
  })
  deletedAt: Date;
}
