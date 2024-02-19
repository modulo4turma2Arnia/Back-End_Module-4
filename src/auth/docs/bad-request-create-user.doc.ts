import { ApiProperty } from '@nestjs/swagger';

export class BadRequestCreateUserDoc {
  @ApiProperty({
    type: String,
    description: 'Email already exists.',
    example: 'There is already a user with this email.',
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
