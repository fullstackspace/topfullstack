import { ApiProperty } from "@nestjs/swagger"

export class LoginDto {
  @ApiProperty() // ApiProperty -> 接口字段描述
  username: string
  @ApiProperty()
  password: string
}