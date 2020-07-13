import { prop, Ref, arrayProp, modelOptions } from "@typegoose/typegoose";
import { ApiProperty } from "@nestjs/swagger";
import { Episode } from './episode.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true } // 用来显示虚拟字段
  }
})
export class Course {
  @ApiProperty({ description: '课程名称' })
  @prop()
  name: string

  @ApiProperty({ description: '封面图' })
  @prop()
  cover: string

  // 该字段为虚拟字段,不会保存到数据库中
  @arrayProp({
    ref: 'Episode',  // 参考的对象
    localField: '_id', // 本地键,当前文件用哪个字段进行关联
    foreignField: 'course' // 外键使用哪个字段关联
  })
  episodes: Ref<Episode>[] // 表示当前字段是参考`Episode`列表
}