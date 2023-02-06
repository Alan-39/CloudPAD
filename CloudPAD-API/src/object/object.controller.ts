import {
  Controller, Delete, Get, Param, Post, Request, UploadedFile, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ObjectService } from './object.service';


@UseGuards(JwtAuthGuard)
@Controller('object')
export class ObjectController {
  constructor(private objectService: ObjectService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadObject(@UploadedFile() file: Express.Multer.File, @Request() req) {
    return this.objectService.uploadObject(`${req.user.id}.${req.body.bucketName}`, file.originalname, file.buffer)
      .then((status) => {
        console.log('uploadObject status:', status);
        return { name: file.originalname, 'last modified': new Date().toLocaleString(undefined), size: file.size }
      });
  }

  @Get('/:bucketName')
  listObjects(@Request() req, @Param() params) {
    return new Promise((resolve, reject) => {
      let data = []
      this.objectService.listObjects(`${req.user.id}.${params.bucketName}`)
        .on('data', (obj) => {
          data.push({
            name: obj.name,
            'last modified': new Date(obj.lastModified).toLocaleString(undefined),
            size: obj.size
          });

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
  getObject(@Request() req, @Param() params) {
    return this.objectService.getObject(`${req.user.id}.${params.bucketName}`, params.objectName)
      .then((url) => {
        return url ? url : new NotFoundException();
      });
  }

  @Get('/stat')
  getObjectStat() {

  }

  @Delete('/:bucketName/:objectName')
  removeObject(@Request() req, @Param() params) {
    return this.objectService.removeObject(`${req.user.id}.${params.bucketName}`, params.objectName)
    .then(() => {
      return { message: 'Object Deleted', statusCode: 200 }
    }).catch((err) => {
      return { message: 'Object delete error', statusCode: 400, error: err }
    });
  }
}
