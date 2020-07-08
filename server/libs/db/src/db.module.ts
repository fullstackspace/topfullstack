import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';


const models = TypegooseModule.forFeature([User])
@Global()  // db模块为全局模块
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/topfullstack', {
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
