import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DbModule } from '@libs/db';
import { CoursesModule } from './courses/courses.module';
import { EpisodesController } from './episodes/episodes.controller';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '@app/common';

const Mao = require('multer-aliyun-oss')

@Module({
  imports: [
    CommonModule,
    // MulterModule 本地存储 
    MulterModule.register({
      dest: 'uploads' // 目标地址
    }),
    // 阿里云存储方式
    // MulterModule.registerAsync({
    //   useFactory() {
    //     return {
    //       // storage指定存储方式
    //       storage: Mao({
    //         config: {
    //           region: process.env.OSS_REGION,
    //           accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    //           accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
    //           bucket: process.env.OSS_BUCKET
    //         }
    //       })
    //     }
    //   }
    // }),
    UsersModule,
    CoursesModule,
    EpisodesModule],
  controllers: [AppController, EpisodesController],
  providers: [AppService],
})
export class AppModule { }
