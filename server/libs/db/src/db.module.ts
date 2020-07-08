import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Course } from './models/course.model';
import { Episode } from './models/episode.model';


const models = TypegooseModule.forFeature([User, Course, Episode])
@Global()  // db模块为全局模块
@Module({
  imports: [
    // TypegooseModule.forRoot('mongodb://localhost/topfullstack', {
    TypegooseModule.forRoot('mongodb://fulladmin:123456@localhost/topfullstack', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    }),
    models
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule { }
