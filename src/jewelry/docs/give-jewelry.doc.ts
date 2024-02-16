import { ApiProperty } from '@nestjs/swagger';

export class GiveJewelryDoc {
  @ApiProperty({
    description: 'ID of the user receiving the jewelry',
    example: '1',
  })
  userId: number;

  @ApiProperty({
    description: 'Jewel ID being assigned',
    example: '2',
  })
  jewelryId: number;
}
