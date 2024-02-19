import { ApiProperty } from '@nestjs/swagger';

export class NotFoundGetInfoUsersDoc {
  @ApiProperty({
    type: String,
    description: 'wrong end point',
    example: 'Cannot GET /v1/productCannot GET /v1/user/infouser',
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
