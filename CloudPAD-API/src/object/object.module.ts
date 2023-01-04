import { Module } from '@nestjs/common';
import { MinioModule as minIOModule } from 'nestjs-minio-client';
import { environment } from '../env/environment.constants';
import { ObjectController } from './object.controller';
import { ObjectService } from './object.service';

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
  providers: [ObjectService],
  controllers: [ObjectController],
  exports: [ObjectService]
})
export class ObjectModule { }
