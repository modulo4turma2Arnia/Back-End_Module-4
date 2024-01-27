import { join } from 'path';

import { FileToBuffer } from './FileToBuffer.mock';
import { FileDTO } from 'src/auth/dto/files.dto';


export const ImageMock = async () => {
  const { buffer, stream } = await FileToBuffer(
    join(__dirname, 'Satoru.png'),
  )

  const ImageProfile: FileDTO = {
    fieldname: 'photo-fieldname',
    originalname: 'Satoru.png',
    mimetype: 'Content-Type',
    size: 1000,
    buffer,
  };

  return ImageProfile;
}