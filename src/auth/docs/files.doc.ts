import { ApiProperty } from '@nestjs/swagger';

export class FileDoc {
  @ApiProperty({
    description: 'Field name of the file.',
    example: 'file',
  })
  fieldname: string;

  @ApiProperty({
    description: 'Original name of the file.',
    example: 'file.jpeg',
  })
  originalname: string;

  @ApiProperty({
    description: 'MIME type of the file.',
    example: 'image/jpeg',
  })
  mimetype: string;

  @ApiProperty({
    description: 'Buffer containing the file data.',
    example: 'SGVsbG8gd29ybGQ=',
  })
  buffer: Buffer;

  @ApiProperty({
    description: 'Size of the file in bytes.',
    example: 1024,
  })
  size: number;
}
