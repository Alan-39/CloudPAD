import { forwardRef, Module } from '@nestjs/common';
import { ObjectController } from './object.controller';
import { ObjectService } from './object.service';
import { AppModule } from '../app.module';

@Module({
  imports: [
    forwardRef(() => AppModule),
  ],
  providers: [ObjectService],
  controllers: [ObjectController],
  exports: [ObjectService]
})
export class ObjectModule { }
