import { Module } from '@nestjs/common';
import { MinioModule as minIOModule } from 'nestjs-minio-client';
import { BucketController } from './bucket.controller';
import { BucketService } from './bucket.service';
import { environment } from '../env/environment.constants';

@Module({
  imports: [
    minIOModule.register({
      endPoint: environment.MINIO_ENDPOINT,
      port: environment.MINIO_PORT,
      useSSL: false,
      accessKey: environment.MINIO_ACCESS_KEY,
      secretKey: environment.MINIO_SECRET_KEY,
    })
  ],
  providers: [BucketService],
  controllers: [BucketController],
  exports: [BucketService]
})
export class BucketModule { }
