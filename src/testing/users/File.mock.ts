import { join } from 'path';

import { GetFileToBuffer } from './GetFileBufferMock';

export const GetFilesMock = async () => {
  const { buffer, stream } = await GetFileToBuffer(
    join(__dirname, 'profile.jpg'),
  );

  const photo = {
    fieldname: 'photo-fieldname',
    originalname: 'profile.jpg',
    mimetype: 'Content-Type',
    size: 1000,
    stream,
    buffer,
  }

  return photo;
}