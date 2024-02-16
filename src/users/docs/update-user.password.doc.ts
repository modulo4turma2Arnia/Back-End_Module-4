import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPasswordDoc {
  @ApiProperty({
    type: String,
    description: 'Current password.',
    example: '12345',
  })
  currentPassword: string;

  @ApiProperty({
    type: String,
    description: 'New password.',
    example: '54321',
  })
  newPassword: string;
}
