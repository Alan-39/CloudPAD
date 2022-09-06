import { Injectable } from '@nestjs/common';
import { MinioService as minIOService } from 'nestjs-minio-client';

@Injectable()
export class MinioService {
  constructor(private readonly minioService: minIOService) { }

  async makeBucket(bucketName: string) {
    if (await this.minioService.client.bucketExists(bucketName)) {
      throw 'Bucket already exists';
    }
    return await this.minioService.client.makeBucket(bucketName, 'us-east-1');
  }

  async listBuckets() {
    return this.minioService.client.listBuckets();
  }
}
