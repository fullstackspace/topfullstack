import { prop, modelOptions, DocumentType } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';

export type UserDocument = DocumentType<User>

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class User {
  @ApiProperty({ description: '用户名', example: 'user1' })
  @prop()
  username: string

  @ApiProperty({ description: '密码', example: 'password' })
  @prop(
    {
      select: false, // 只有手动置为true才会展示给前端
      // const user = await this.userModel.findOne({ username }).select('+password') 这样才会显示密码
      set(val) {
        return val ? hashSync(val) : ''
      },
      get(val) {
        return val
      }
    }
  )
  password: string
}