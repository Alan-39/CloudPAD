import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BucketModule } from './bucket/bucket.module';
import { ObjectModule } from './object/object.module';
import { AuthModule } from './auth/auth.module';
import { MinioModule } from 'nestjs-minio-client';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('MONGODB_CONNECTION_STRING'),
        useNewUrlParser: true,
        synchronize: true,
        useUnifiedTopology: true,
        logging: true,
        ssl: true,
        database: configService.get('MONGODB_DATABASE'),
        entities: [__dirname + '/**/*.entity.{js,ts}'],
      })
    }),
    MinioModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        endPoint: configService.get('MINIO_ENDPOINT'),
        port: +configService.get('MINIO_PORT'), // note: + is just a alternative to Number(process.env.MINIO_PORT)
        useSSL: false,
        accessKey: configService.get('MINIO_ACCESS_KEY'),
        secretKey: configService.get('MINIO_SECRET_KEY'),
      }),
    }),
    UserModule,
    BucketModule,
    ObjectModule,
    AuthModule
  ],
  providers: [],
  controllers: [],
  exports: [MinioModule]
})
export class AppModule {}
