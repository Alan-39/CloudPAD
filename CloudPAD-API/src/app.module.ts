import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
  providers: [],
})
export class AppModule {}
