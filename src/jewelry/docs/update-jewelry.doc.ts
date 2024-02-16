import { ApiProperty } from '@nestjs/swagger';

export class UpdateJewelryDoc {
  @ApiProperty({
    type: String,
    description: 'New type of jewelry.',
    example: 'Joia do tempo ',
  })
  type: string;

  @ApiProperty({
    type: String,
    description: 'New habilities or features of the jewelry.',
    example:
      'Foco - Nesta joia está a possibilidade de total domínio sobre a dimensão temporal, aquele que a possui tem a capacidade de lidar com grande volume de demandas dentro dos prazos estabelecidos, mantendo atenção aos detalhes, tendo em vista o alcance de resultados.',
  })
  habilities: string;
}
