import { ApiProperty } from '@nestjs/swagger';

export class NotFoundGiveJewelryDoc {
  @ApiProperty({
    type: String,
    description: '"User or jewel not found.',
    example: '"User or jewel not found.',
  })
  message: string;

  @ApiProperty({
    type: String,
    description: 'Error message',
    example: 'Not Found',
  })
  error: string;

  @ApiProperty({
    type: Number,
    description: 'http request status.',
    example: 404,
  })
  statusCode: number;
}
