import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ResponseUserDTO } from './dto/response-user.dto';
import { ApiAcceptedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryUserDTO } from './dto/query-user.dto';
import { ListUserQueryDTO } from './dto/list-user-query.dto';
import { ListUserBalanceFilterDTO } from './dto/list-user-balance-filter.dto';

@Controller('api/user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: `List user` })
  @ApiAcceptedResponse({ type: [ResponseUserDTO] })
  getUsers(@Query() query: ListUserQueryDTO): Promise<ResponseUserDTO[]> {
    return this.userService.getUsers(query);
  }

  @Get('balance-filter')
  @ApiOperation({ summary: `List user filter by balance` })
  @ApiAcceptedResponse({ type: [ResponseUserDTO] })
  getUsersByBalance(
    @Query() query: ListUserBalanceFilterDTO,
  ): Promise<ResponseUserDTO[]> {
    return this.userService.getUsersByBalance(query);
  }

  @Get(':email')
  @ApiOperation({ summary: `Get user detail` })
  @ApiAcceptedResponse({ type: ResponseUserDTO })
  getUserDetail(@Param() query: QueryUserDTO): Promise<ResponseUserDTO> {
    return this.userService.getUserDetail(query);
  }

  @Post()
  @ApiOperation({ summary: `Create User` })
  @ApiAcceptedResponse({ type: ResponseUserDTO })
  createUser(@Body() user: CreateUserDTO): Promise<ResponseUserDTO> {
    return this.userService.create(user);
  }

  @Put()
  @ApiOperation({ summary: `Update User` })
  @ApiAcceptedResponse({ type: ResponseUserDTO })
  updateUser(@Body() user: CreateUserDTO): Promise<ResponseUserDTO> {
    return this.userService.update(user);
  }

  @Delete(':email')
  @ApiOperation({ summary: `Delete User` })
  @ApiAcceptedResponse({ type: ResponseUserDTO })
  deleteUser(@Param() user: QueryUserDTO): Promise<string> {
    return this.userService.delete(user.email);
  }
}
