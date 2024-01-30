import { GetFilesMock } from "../users";

export const GetMultipleFilesMock = async () => {
    const photos = [
      await GetFilesMock(),
      await GetFilesMock(),
    ];
  
    return photos;
  };
  