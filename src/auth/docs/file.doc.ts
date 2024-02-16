import { ApiProperty } from '@nestjs/swagger';

export class FileDoc {
  @ApiProperty({
    description: 'Name of the file field',
    example: 'profileImage',
  })
  fieldname: string;

  @ApiProperty({
    description: 'Original name of the file',
    example: 'profile.jpg',
  })
  originalname: string;

  @ApiProperty({
    description: 'MIME type of the file',
    example: 'image/jpeg',
  })
  mimetype: string;

  @ApiProperty({
    description: 'Buffer of the file',
    type: 'string',
    format: 'binary',
  })
  buffer: Buffer;

  @ApiProperty({
    description: 'Size of the file in bytes',
    example: 1024,
  })
  size: number;
}
