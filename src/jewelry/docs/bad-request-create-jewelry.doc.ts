import { ApiProperty } from '@nestjs/swagger';

export class BadRequestCreateJewelryDoc {
  @ApiProperty({
    type: String,
    description: 'Type not specified.',
    example:
      'type must be longer than or equal to 0 characters, type should not be empty, type must be a string',
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
