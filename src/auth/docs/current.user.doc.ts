import { ApiProperty } from '@nestjs/swagger';

export class CurrentUserDoc {
  @ApiProperty({
    type: Number,
    description: 'Unique identificator for an user.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Email address of the user.',
    example: 'guilherme@email.com',
  })
  email: string;
}
