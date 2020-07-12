import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Course } from '@libs/db/models/course.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';
@Crud({
  model: Course
})
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  constructor(@InjectModel(Course) private readonly model) { }

  @Get('options')
  options() {
    return {
      index: true,
      searchMenuSpan: 8,
      indexLabel: ' ',
      title: '课程列表',
      column: [
        {
          label: '课程名称',
          prop: 'name',
          sortable: true, // 可排序
          search: true, // 可作为搜索字段
          regex: true, // 该字段作为自定义字段,表示是否进行模糊匹配
          row: true // 独占一行
        },
        {
          prop: "cover",
          label: "课程封面图",
          // type: 'upload',
          // width: 120,
          // listType: 'picture-img',
          // row: true, action: 'upload'
        }
      ]
    }
  }
}
