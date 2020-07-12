import { Strategy, IStrategyOptions } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { User } from '@libs/db/models/user.model'
import { BadRequestException } from '@nestjs/common'
import { compareSync } from 'bcryptjs'

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  // 书写constructor表示取使用该策略的具体字段,不书写则获取全部字段
  // IStrategyOptions可以增加对应的代码提示
  constructor(@InjectModel(User) private userModel: ReturnModelType<typeof User>) {
    super({ usernameField: 'username', passwordField: 'password' } as IStrategyOptions)
  }

  // 本地策略验证
  async validate(username: string, password: string) {
    const user = await this.userModel.findOne({ username }).select('+password')
    if (!user) {
      throw new BadRequestException('用户名不正确')
    }
    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码不正确')
    }
    return user;
  }
}