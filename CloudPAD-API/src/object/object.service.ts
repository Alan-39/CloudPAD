import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';

@Injectable()
export class ObjectService {
  constructor(private readonly minioService: MinioService) { }

  async uploadObject(bucketName: string, objectName: string, stream: any) {
    return await this.minioService.client.putObject(bucketName, objectName, stream);
  }

  listObjects(bucketName: string) {
    return this.minioService.client.listObjects(bucketName);
  }
  
  async getObject(bucketName: string, objectName: string) {
    return await this.minioService.client.presignedGetObject(bucketName, objectName, 24*60*60);
  }

  async getObjectStat() {

  }

  async removeObject(bucketName, objectName) {
    return await this.minioService.client.removeObject(bucketName, objectName);
  }
}
