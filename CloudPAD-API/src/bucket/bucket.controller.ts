import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { MakeBucketDto } from './dto/make-bucket.dto';
import { BucketService } from './bucket.service';

@Controller('bucket')
export class BucketController {
  constructor(
    private readonly bucketService: BucketService,
  ) { }

  @Post('')
  makeBucket(@Body() makebucketDto: MakeBucketDto) {
    return this.bucketService.makeBucket(makebucketDto.bucketName)
    .then(response => {
      console.log('make bucket res = ', response);
      return { message: `${makebucketDto.bucketName} bucket created`, statusCode: 200 };
    }).catch(err => {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    })
  }

  @Get('')
  listBuckets() {
    return this.bucketService.listBuckets();
  }

  @Delete('/:name')
  removeBucket(@Param('name') name: string) {
    return this.bucketService.removeBucket(name).then(response => {
      return { message: `${name} bucket removed`, statusCode: 200 };
    }).catch((err) => {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    })
  }

}
