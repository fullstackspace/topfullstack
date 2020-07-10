import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Episode } from '@libs/db/models/episode.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: Episode
})
@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(@InjectModel(Episode) private readonly model) { }

  @Get('options')
  options() {
    return {
      index: true,
      indexLabel: ' ',
      title: '课时列表',
      column: [
        {
          label: '课时名称',
          prop: 'name'
        }
      ]
    }
  }
}
