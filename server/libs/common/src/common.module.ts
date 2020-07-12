import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config'
import { DbModule } from '@libs/db';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true  // 表示common模块在任意磨口都可以使用
  }),
    DbModule
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule { }
