import { Injectable } from '@nestjs/common';
import { MinioService as minIOService } from 'nestjs-minio-client';

@Injectable()
export class ObjectService {
  constructor(private readonly minioService: minIOService) { }

  async uploadObject() {

  }

  listObjects(bucketName: string) {
    return this.minioService.client.listObjects(bucketName)
  }
  
  async downloadObject() {

  }

  async getObjectStat() {

  }

  async removeObject() {

  }
}
