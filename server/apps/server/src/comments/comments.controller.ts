import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Comment } from '@libs/db/models/comment.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CurrentUser } from '../auth/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@Controller('comments')
@ApiTags('评论')
export class CommentsController {
  constructor(@InjectModel(Comment) private commentModel: ReturnModelType<typeof Comment>) { }

  @Get()
  async index() {
    return await this.commentModel.find()
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto, @CurrentUser() user) {
    dto.user = user._id // 防止前端传递非当前用户的id。而导致其他用户的评论被修改
    return await this.commentModel.create(dto)
  }
}
