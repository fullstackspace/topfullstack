import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { User } from '@libs/db/models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ApiTags } from '@nestjs/swagger';
@Crud({
  model: User
})
@Controller('users')
@ApiTags('用户')
export class UsersController {
  constructor(@InjectModel(User) private readonly model) { }

  @Get('options')
  options() {
    return {
      index: true,
      indexLabel: ' ',
      title: '用户列表',
      column: [
        {
          label: '用户名',
          prop: 'username'
        }
      ]
    }
  }
}
