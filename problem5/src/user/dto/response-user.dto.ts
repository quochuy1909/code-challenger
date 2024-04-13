import { ApiResponseProperty } from '@nestjs/swagger';

export class ResponseUserDTO {
  @ApiResponseProperty()
  username: string;

  @ApiResponseProperty()
  email: string;

  @ApiResponseProperty()
  phone: string;

  @ApiResponseProperty()
  balance: number;
}
