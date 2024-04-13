import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class QueryUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;
}
