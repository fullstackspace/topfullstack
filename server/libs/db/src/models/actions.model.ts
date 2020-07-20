import { prop, Ref, modelOptions } from '@typegoose/typegoose';

import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
import { Course } from './course.model';
import { Episode } from './episode.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
// 用户针对某个类型的某个东西,做了某个操作,记录下来
export class Action {
  @prop({
    ref: 'User', // ref表示当前字段参考那个模型类
  })
  user: Ref<User>; // 参考的类型

  @prop({
    enum: ['Course', 'Episode'], // 枚举类型,仅允许是数组内的值
  })
  type: string;

  // @prop({
  //   refPath: 'type', // refPath基于当前模型的某个字段来进行参考 -> 类似mongoose中的populate关联
  // })
  // object: Ref<Course | Episode>; // 参考的类型是Course或Episode ->后续有其他类型可以继续添加
  @prop({ refPath: 'type' })
  object: Ref<Course | Episode>;

  @prop({
    enum: ['like', 'upVote'],
  })
  name: string;
}
