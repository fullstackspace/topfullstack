import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Course } from './models/course.model';
import { Episode } from './models/episode.model';
import { Action } from './models/actions.model';
import { Comment } from './models/comment.model';


const models = TypegooseModule.forFeature([User, Course, Episode, Action, Comment])
@Global()  // db模块为全局模块
@Module({
  imports: [
    // TypegooseModule.forRoot('mongodb://localhost/topfullstack', {
    // nest中的模块是并行加载的,common中的模块和db模块是并行加载的,process.env.DB直接执行。common没有加载完就去读取就会有问题
    // nest机会所有模块都有TypegooseModule.forRoot({})和TypegooseModule.forRootAsync({})
    // useFactory工厂模式
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri: process.env.DB,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: true,
        }
      }
    }),
    // TypegooseModule.forRoot(process.env.DB, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: true,
    // }),
    models
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule { }
