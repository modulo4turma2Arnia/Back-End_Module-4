import { ApiProperty } from '@nestjs/swagger';

export class GiveJewelryResponseDoc {
  @ApiProperty({
    type: String,
    description: 'Response for jewels awarded successfully.',
    example:
      'Jewel "Joia do poder" and credits successfully assigned to the use.',
  })
  response: string;
}
