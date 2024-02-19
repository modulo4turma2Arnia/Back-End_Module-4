import { ApiProperty } from '@nestjs/swagger';

export class NotFoundUpdateProductDoc {
  @ApiProperty({
    type: String,
    description: 'Incorrect id',
    example: 'Product with ID XX not found',
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
