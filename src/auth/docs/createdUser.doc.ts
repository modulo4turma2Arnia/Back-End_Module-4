import { ApiProperty } from '@nestjs/swagger';
import { UserRegisterDoc } from './register.doc';
import { CreatedProductDoc } from 'src/products/docs/created-product.doc';

export class CreatedUserDoc extends UserRegisterDoc {
  @ApiProperty({
    type: Number,
    description: 'User credit balance',
    example: 0,
    required: true,
  })
  credits: number;

  @ApiProperty({
    type: Number,
    description: 'Unique identificator for an user.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The uploaded file.',
    type: CreatedProductDoc,
  })
  products: CreatedProductDoc;

  @ApiProperty({
    type: Date,
    description: 'When an user was created.',
    example: '2024-02-14',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'When an user was updated.',
    example: '2024-02-14',
  })
  updatedAt: Date;

  @ApiProperty({
    type: Date,
    description: 'When an user was deleted.',
    example: ' 2024-02-14 14:16:32.594761',
  })
  deletedAt: Date;

  @ApiProperty({
    type: String,
    description: 'Link to the image hosted on Firebase',
    example:
      'https://firebasestorage.googleapis.com/v0/b/modulo4-4f6b2.appspot.com/o/1706915097376.airfrier?alt=media&token=a92c1548-bdb4-4a11-9791-c885cc71c4a8',
  })
  image: string;
}
