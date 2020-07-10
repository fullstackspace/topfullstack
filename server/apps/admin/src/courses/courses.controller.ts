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
      indexLabel: ' ',
      title: '课程列表',
      column: [
        {
          label: '课程名称',
          prop: 'name'
        },
        {
          label: '课程封面图',
          prop: 'cover'
        }
      ]
    }
  }
}
