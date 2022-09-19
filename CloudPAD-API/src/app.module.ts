import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BucketModule } from './bucket/bucket.module';
import { environment } from './env/environment.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `config/dev.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: environment.MONGODB_CONNECTION_STRING,
      port: environment.MONGODB_PORT,
      database: environment.MONGODB_DATABASE,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
    }),
    UserModule,
    BucketModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
