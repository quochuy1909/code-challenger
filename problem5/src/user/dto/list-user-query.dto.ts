import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { PaginateQueryDTO } from './pagination-query.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { SORT_ORDER, SORT_TYPE } from 'src/constant/pagination';

export class ListUserQueryDTO extends IntersectionType(PaginateQueryDTO) {
  @ApiProperty({
    required: false,
    enum: SORT_TYPE,
  })
  @IsOptional()
  @IsEnum(SORT_TYPE)
  sort?: SORT_TYPE;

  @ApiProperty({
    required: false,
    enum: SORT_ORDER,
  })
  @IsOptional()
  @IsEnum(SORT_ORDER)
  order?: SORT_ORDER;
}
