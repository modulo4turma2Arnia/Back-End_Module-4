import { ApiProperty } from '@nestjs/swagger';

export class NotFoundGetAllJewelryDoc {
  @ApiProperty({
    type: String,
    description: 'wrong end point',
    example: 'Cannot GET /v1/jewelr',
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
