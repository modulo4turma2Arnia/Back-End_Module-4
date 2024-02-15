import { CreateProductDoc } from './create-product.doc';
import { ApiProperty } from '@nestjs/swagger';

export class CreatedProductDoc extends CreateProductDoc {
  @ApiProperty({
    type: Number,
    description: 'Unique identificator for an product.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: Date,
    description: 'When an product was created.',
    example: '2024-02-14',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'When an product was updated.',
    example: '2024-02-14',
  })
  updatedAt: Date;

  @ApiProperty({
    type: Date,
    description: 'When an product was deleted.',
    example: ' 2024-02-14 14:16:32.594761',
  })
  deletedAt: Date;

  @ApiProperty({
    type: String,
    description: 'Link to the image hosted on Firebase',
    example:
      'https://firebasestorage.googleapis.com/v0/b/modulo4-4f6b2.appspot.com/o/1706915097376.airfrier?alt=media&token=a92c1548-bdb4-4a11-9791-c885cc71c4a8',
  })
  image: string;
}
