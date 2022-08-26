import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `config/dev.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.MONGODB_CONNECTION_STRING || 'localhost',
      port: 27017,
      database: process.env.MONGODB_DATABASE || 'cloudpad',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
