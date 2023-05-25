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
  async listBuckets(@Request() req) {
    const userBuckets = await this.bucketService.listBuckets();
    const result = userBuckets.filter(obj => {
      const userObj = obj.name.split('.');
      if (req.user.id == userObj[0]) {
        return obj.name = userObj[1];
      }
    })
    return result;
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
