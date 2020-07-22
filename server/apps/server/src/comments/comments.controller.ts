import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Comment } from '@libs/db/models/comment.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CurrentUser } from '../auth/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('comments')
@ApiTags('评论')
export class CommentsController {
  constructor(@InjectModel(Comment) private commentModel: ReturnModelType<typeof Comment>) { }

  @Get()
  @ApiOperation({ summary: '查询评论信息' })
  // @Query() => 表示直接取整个Query对象 {query:xxxx}  @Query('query') => 明确取出query  query:xxx
  async index(@Query('query') query) {
    console.log(query)
    const params = JSON.parse(query)
    // populate和那个表关联
    // where查询条件
    // sort排序方式
    // limit展示数目
    // return await this.commentModel.find().populate('user').where(params.where).sort('-_id').limit(20)
    return await this.commentModel.find().populate('user').where(params.where).setOptions(params)
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '增加评论' })
  async create(@Body() dto, @CurrentUser() user) {
    dto.user = user._id // 防止前端传递非当前用户的id。而导致其他用户的评论被修改
    return await this.commentModel.create(dto)
  }
}
