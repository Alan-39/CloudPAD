import {
  Controller,
  Request,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  UseGuards,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { MakebucketDto } from './dto/make-bucket.dto';
import { MinioService } from './minio.service';

@Controller('minio')
export class MinioController {
  constructor(
    private readonly minioService: MinioService,
  ) { }

  @Post('make-bucket')
  async makeBucket(@Body() makebucketDto: MakebucketDto) {
    return this.minioService.makeBucket(makebucketDto.bucketName)
    .then(response => {
      console.log('make bucket res = ', response);
      return { message: `${makebucketDto.bucketName} bucket created`, statusCode: 200 };
    }).catch(err => {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    })
  }

  @Get('list-buckets')
  async listBuckets() {
    return this.minioService.listBuckets();
  }

}
