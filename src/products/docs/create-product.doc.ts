import { ApiProperty } from '@nestjs/swagger';
import { FileDoc } from 'src/auth/docs/file.doc';

export class CreateProductDoc {
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
    type: FileDoc,
    description: 'Upload image product.',
    required: true,
  })
  image: FileDoc;
}
