import { Injectable } from '@nestjs/common';
@Injectable()
export class StorageService {
  async uploadFile(file: any, folder = 'uploads') {
    const filename = file?.originalname || `file-${Date.now()}`;
    return {
      url: `https://storage.satcom-engineers.com/${folder}/${Date.now()}-${filename}`,
      filename,
    };
  }
}