import { ApiProperty } from '@nestjs/swagger';

export class DeleteJewelryResponseDoc {
  @ApiProperty({
    type: String,
    description: 'Response for jewelry deleted.',
    example: 'Jewelry with id: 1 removed.',
  })
  response: string;
}
