import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { User } from '@libs/db/models/user.model'


/**
 * jwt登录注意事项
 * 1.将token取出
 * 2.通过token解密出来的信息去找该用户
 */
// PassportStrategy(Strategy, 'jwt')不能和本地策略冲突。否则会无法生成token. @UseGuards()守卫会抛出401异常
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // 书写constructor表示取使用该策略的具体字段,不书写则获取全部字段
  // IStrategyOptions可以增加对应的代码提示
  constructor(@InjectModel(User) private userModel: ReturnModelType<typeof User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // 取出token
      secretOrKey: process.env.SECRET // 加密token的秘钥 -> 还原加密前的信息
    } as StrategyOptions)
  }

  // jwt策略验证 解密出来会默认返回一个参数
  async validate(id) {
    return await this.userModel.findById(id)
  }
}