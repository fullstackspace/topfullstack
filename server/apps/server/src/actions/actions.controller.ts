import { Controller, Get, Query, UseGuards, Post, Body } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ReturnModelType } from '@typegoose/typegoose';
import { CurrentUser } from '../auth/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@Controller('actions')
@ApiTags('操作')
export class ActionsController {
  constructor(@InjectModel(Action) private actionModel: ReturnModelType<typeof Action>) { }

  @Get('status')
  @UseGuards(AuthGuard('jwt'))  // 用户信息是使用jwt策略存储的,所以获取时也要使用jwt策略获取
  async getStatus(@Query() dto, @CurrentUser() user) {
    dto.user = user._id
    const count = await this.actionModel.countDocuments(dto) // countDocuments返回的是统计的数量
    return { status: count > 0 }
  }


  @Post('toggle')
  @UseGuards(AuthGuard('jwt'))
  async toogle(@Body() dto, @CurrentUser() user) {
    dto.user = user._id
    const res = await this.getStatus(dto, user)
    if (res.status) {
      await this.actionModel.deleteMany(dto)
    } else {
      await this.actionModel.create(dto)
    }
    return await this.getStatus(dto, user)
  }
  // @Post('toggle')
  // @UseGuards(AuthGuard('jwt'))
  // async toggle(@Body() dto, @CurrentUser() user) {
  //   dto.user = user._id
  //   const ret = await this.getStatus(dto, user)
  //   if (ret.status) {
  //     await this.actionModel.deleteMany(dto)
  //   } else {
  //     await this.actionModel.create(dto)
  //   }
  //   return await this.getStatus(dto, user)
  // }
}
