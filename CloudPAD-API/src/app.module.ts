import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BucketModule } from './bucket/bucket.module';
import { environment } from './env/environment.constants';
import { ObjectModule } from './object/object.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `config/dev.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: environment.MONGODB_CONNECTION_STRING,
      useNewUrlParser: true,
      synchronize: true,
      useUnifiedTopology: true,
      logging: true,
      ssl: true,
      database: environment.MONGODB_DATABASE,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
    }),
    UserModule,
    BucketModule,
    ObjectModule,
    AuthModule
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
