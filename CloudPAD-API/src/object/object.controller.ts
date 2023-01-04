import {
  Controller, Delete, Get, Param, Post, Request, UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ObjectService } from './object.service';


@UseGuards(JwtAuthGuard)
@Controller('object')
export class ObjectController {
  constructor(private objectService: ObjectService) { }

  @Post('upload')
  uploadObject() {

  }

  @Get('/:bucketName')
  listObjects(@Request() req, @Param() params) {
    return new Promise((resolve, reject) => {
      let data = []
      this.objectService.listObjects(`${req.user.id}.${params.bucketName}`)
      .on('data', (obj) => {
        console.log(obj)
        data.push(obj);
      })
      .on('error', (err) => {
        console.log('list obj err: ', err);
        reject(err)
      })
      .on('end', () => {
        resolve(data);
      })
    })
  }

  @Get('/:bucketName/:objectName')
  downloadObject() {

  }

  @Get('/stat')
  getObjectStat() {

  }

  @Delete('/:bucketName/:objectName')
  removeObject() {

  }

}
