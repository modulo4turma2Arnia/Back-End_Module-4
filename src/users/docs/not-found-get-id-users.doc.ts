import { ApiProperty } from '@nestjs/swagger';

export class NotFoundGetIdUsersDoc {
  @ApiProperty({
    type: String,
    description: 'ID does not exist',
    example: 'User with ID XX not found',
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
