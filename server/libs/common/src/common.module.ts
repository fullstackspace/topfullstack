import { Module, Global } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { DbModule } from '@libs/db';
// 全局模块
@Global()
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true  // 表示common模块在任意磨口都可以使用
  }),
  JwtModule.registerAsync({
    useFactory() {
      return {
        secret: process.env.SECRET
      }
    }
  }),
    DbModule
  ],
  providers: [CommonService],
  exports: [CommonService, JwtModule],
})
export class CommonModule { }
