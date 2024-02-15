import { ApiProperty } from '@nestjs/swagger';

export class CreateJewelryDoc {
  @ApiProperty({
    type: String,
    description: 'Type of jewelry.',
    example: 'Joia da Mente ',
    required: true,
  })
  type: string;

  @ApiProperty({
    type: String,
    description: 'Habilities or features of the jewelry.',
    example:
      '(Comunicação) O poder dessa joia está na possibilidade de conseguir acessar diretamente os pensamentos de qualquer ser, transformando ideias em palavras, com assertividade na transmissão e receptividade das informações.',
    required: true,
  })
  habilities: string;
}
