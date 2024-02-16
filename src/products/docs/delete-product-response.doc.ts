import { ApiProperty } from '@nestjs/swagger';

export class DeleteProductResponseDoc {
  @ApiProperty({
    type: String,
    description: 'Response for product deleted.',
    example: 'Product with id 1 has been remove.',
  })
  response: string;
}
