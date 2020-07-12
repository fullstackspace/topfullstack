import { Controller, Get } from '@nestjs/common';
import { Episode } from '@libs/db/models/episode.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';
import { Course } from '@libs/db/models/course.model';

@Crud({
  model: Episode
})
@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(
    @InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>,
    @InjectModel(Course) private readonly courseModel: ReturnModelType<typeof Course>
  ) { }

  @Get('option')
  async option() {
    const courses = (await this.courseModel.find()).map(v => ({
      label: v.name,
      value: v._id
    }))
    console.log(courses)
    return {
      title: '课时列表',
      translate: false,
      column: [
        {
          prop: 'course',
          label: '所属课程',
          type: 'select',
          dicdata: courses,
        },
        {
          label: '课时名称',
          prop: 'name'
        }
      ]
    }
  }
}
