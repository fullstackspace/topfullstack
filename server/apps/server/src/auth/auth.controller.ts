import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User, UserDocument } from '@libs/db/models/user.model';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport'
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt'
import { CurrentUser } from './current-user.decorator';



@Controller('auth')
@ApiTags('用户')
export class AuthController {
  // 有private 当前整个ts文件都可以使用
  // 无private 只能在constructor中使用

  // ReturnModelType<typeof User>  ReturnModelType表示是模型类
  constructor(
    private jwtService: JwtService,
    @InjectModel(User) private userModel: ReturnModelType<typeof User>
  ) { }

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() dto: RegisterDto) {
    const { username, password } = dto
    // create创建数据, 或者实例化model在调用实例化对象的save方法
    const user = await this.userModel.create({
      username,
      password
    })
    return user
  }

  // 使用本地策略
  @Post('login')
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local')) // 表明使用的是local.strategy.local中的local策略,名称要保持一致
  async login(@Body() dto: LoginDto, @CurrentUser() user: UserDocument) {
    return {
      token: this.jwtService.sign(String(user._id))  // 通过用户的住建生成唯一的token
    }
  }

  // 使用JWT策略
  @Get('user')
  @ApiOperation({ summary: '获取个人信息' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth() // 表示当前接口需要传递token
  // DocumentType表示mongoose文档
  async user(@CurrentUser() user: UserDocument) {
    return user
  }
}
