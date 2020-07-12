import { prop, Ref, modelOptions } from "@typegoose/typegoose";
import { Course } from "./course.model";
import { ApiProperty } from "@nestjs/swagger";

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Episode {
  @ApiProperty({ description: '课时名称' })
  @prop()
  name: string

  @ApiProperty({ description: '文件名称' })
  @prop()
  file: string

  @prop({ ref: 'Course' })
  course: Ref<Course>[]
}