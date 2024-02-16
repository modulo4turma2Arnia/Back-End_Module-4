import { ApiProperty } from '@nestjs/swagger';

export class CreatedProductDoc {
  @ApiProperty({
    type: String,
    description: 'Name of the product.',
    example: 'Mochila Executiva para Notebook',
    required: true,
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Description of the product.',
    example:
      'Os notebooks estão a cada dia mais presentes na rotina das pessoas e uma de suas vantagens é a sua característica de portabilidade, o que fez surgir a necessidade de transportá-los de forma fácil e segura.',
    required: true,
  })
  description: string;

  @ApiProperty({
    type: Number,
    description: 'Product price in jewelry credits',
    example: 2,
    required: true,
  })
  price: number;

  @ApiProperty({
    type: String,
    description: 'Link to the image hosted on Firebase',
    example:
      'https://firebasestorage.googleapis.com/v0/b/modulo4-4f6b2.appspot.com/o/1706915097376.airfrier?alt=media&token=a92c1548-bdb4-4a11-9791-c885cc71c4a8',
  })
  image: string;

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
    example: 'null',
  })
  deletedAt: Date;
}
