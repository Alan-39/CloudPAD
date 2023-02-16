import { forwardRef, Module } from '@nestjs/common';
import { AppModule } from '../app.module';
import { BucketController } from './bucket.controller';
import { BucketService } from './bucket.service';

@Module({
  imports: [
    forwardRef(() => AppModule),
  ],
  providers: [BucketService],
  controllers: [BucketController],
  exports: [BucketService]
})
export class BucketModule { }
