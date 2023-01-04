import {
  Controller,
  Request,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { MakeBucketDto } from './dto/make-bucket.dto';
import { BucketService } from './bucket.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('bucket')
export class BucketController {
  constructor(
    private readonly bucketService: BucketService,
  ) { }

  @Post('')
  makeBucket(@Request() req, @Body() makebucketDto: MakeBucketDto) {
    return this.bucketService.makeBucket(`${req.user.id}.${makebucketDto.bucketName}`)
    .then(response => {
      console.log('make bucket res = ', response);
      return { message: `${makebucketDto.bucketName} bucket created`, statusCode: 200 };
    }).catch(err => {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    })
  }

  @Get('')
  async listBuckets() {
    let userBuckets = await this.bucketService.listBuckets();
    userBuckets.forEach(obj => {
      obj.name = obj.name.split('.')[1];
    })
    console.log('userbuckets: ', userBuckets);
    return userBuckets
  }

  @Delete('/:name')
  removeBucket(@Request() req, @Param('name') name: string) {
    return this.bucketService.removeBucket(`${req.user.id}.${name}`).then(response => {
      return { message: `${name} bucket removed`, statusCode: 200 };
    }).catch((err) => {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    })
  }
}
