import { ApiProperty } from '@nestjs/swagger';

export class BadRequestCreateProductDoc {
  @ApiProperty({
    type: String,
    description: 'Name product not specified.',
    example:
      'name product must be longer than or equal to 0 characters, name product should not be empty, name product must be a string',
  })
  message: string;

  @ApiProperty({
    type: String,
    description: 'Error message',
    example: 'Bad Request',
  })
  error: string;

  @ApiProperty({
    type: Number,
    description: 'http request status.',
    example: 400,
  })
  statusCode: number;
}
