import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';

@Injectable()
export class BucketService {
  constructor(private readonly minioService: MinioService) { }

  async makeBucket(bucketName: string) {
    try {
      if (await this.minioService.client.bucketExists(bucketName)) {
        throw 'This bucket name already exists';
      }
      return await this.minioService.client.makeBucket(bucketName, 'us-east-1');
    } catch(err) {
      throw err;
    }
  }

  async listBuckets() {
    return await this.minioService.client.listBuckets();
  }

  async removeBucket(name: string) {
    try {
      return await this.minioService.client.removeBucket(name);
    } catch(err) {
      throw err;
    }
  }
}
