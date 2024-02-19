import { ApiProperty } from '@nestjs/swagger';

export class NotFoundGetAllProductsDoc {
  @ApiProperty({
    type: String,
    description: 'wrong end point',
    example: 'Cannot GET /v1/product',
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
