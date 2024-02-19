import { ApiProperty } from '@nestjs/swagger';

export class NotFoundGetIdJewelryDoc {
  @ApiProperty({
    type: String,
    description: 'ID does not exist',
    example: 'Jewel with ID 20 not found',
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
