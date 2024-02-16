import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDoc {
  @ApiProperty({
    type: String,
    description: 'Updated product name.',
    example: 'Mochila para Notebook',
    required: true,
  })
  name: string;

}
