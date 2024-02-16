import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPasswordResponseDoc {
  @ApiProperty({
    type: String,
    description: 'Response for changed password.',
    example: 'User Password changed succefully.',
  })
  response: string;
}
