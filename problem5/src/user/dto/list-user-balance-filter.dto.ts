import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { PaginateQueryDTO } from './pagination-query.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ListUserQueryDTO } from './list-user-query.dto';

export class ListUserBalanceFilterDTO extends IntersectionType(
  PaginateQueryDTO,
  ListUserQueryDTO,
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  balance: number;
}
