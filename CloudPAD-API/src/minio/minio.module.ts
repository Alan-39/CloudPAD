import { Module } from '@nestjs/common';
import { MinioModule as minIOModule } from 'nestjs-minio-client';
import { MinioController } from './minio.controller';
import { MinioService } from './minio.service';
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
  providers: [MinioService],
  controllers: [MinioController],
  exports: [MinioService]
})
export class MinioModule { }
