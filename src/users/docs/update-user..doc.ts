import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDoc {
  @ApiProperty({
    type: String,
    description: 'First name update.',
    example: 'Guilherme atualizado',
  })
  FirstName: string;

}
