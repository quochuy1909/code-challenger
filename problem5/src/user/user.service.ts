import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entity/user.entity';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { ResponseUserDTO } from './dto/response-user.dto';
import { QueryUserDTO } from './dto/query-user.dto';
import { ListUserQueryDTO } from './dto/list-user-query.dto';
import { SORT_ORDER } from 'src/constant/pagination';
import { ListUserBalanceFilterDTO } from './dto/list-user-balance-filter.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModule: Model<UserDocument>,
  ) {}
  getUsers(query: ListUserQueryDTO): Promise<ResponseUserDTO[]> {
    try {
      const { pageIndex, pageSize, sort, order } = query;
      return this.userModule
        .find()
        .sort({ [sort]: order === SORT_ORDER.DESC ? -1 : 1 })
        .skip(pageSize * (pageIndex - 1))
        .limit(pageSize)
        .exec();
    } catch (error) {
      if (error instanceof HttpException)
        throw new BadRequestException('Bad Request');
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  getUsersByBalance(
    query: ListUserBalanceFilterDTO,
  ): Promise<ResponseUserDTO[]> {
    try {
      const { pageIndex, pageSize, sort, order, balance } = query;
      return this.userModule
        .find({ balance: { $gt: balance } })
        .sort({ [sort]: order === SORT_ORDER.DESC ? -1 : 1 })
        .skip(pageSize * (pageIndex - 1))
        .limit(pageSize)
        .exec();
    } catch (error) {
      if (error instanceof HttpException)
        throw new BadRequestException('Bad Request');
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getUserDetail(query: QueryUserDTO): Promise<ResponseUserDTO> {
    try {
      const result = await this.userModule.findOne({
        email: query.email,
      });
      if (!result) throw new BadRequestException('User not found');
      return {
        balance: result.balance,
        email: result.email,
        phone: result.phone,
        username: result.username,
      };
    } catch (error) {
      if (error instanceof HttpException)
        throw new BadRequestException('Bad Request');
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async create(user: CreateUserDTO): Promise<ResponseUserDTO> {
    try {
      const isUserExisted = await this.userModule.findOne({
        $or: [{ username: user.username }, { email: user.email }],
      });
      if (isUserExisted) {
        throw new ConflictException('User already existed');
      }
      const result = await this.userModule.create(user);
      return {
        balance: result.balance,
        email: result.email,
        phone: result.phone,
        username: result.username,
      };
    } catch (error) {
      if (error instanceof HttpException)
        throw new BadRequestException('Bad Request');
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async update(user: CreateUserDTO): Promise<ResponseUserDTO> {
    try {
      const { email, phone, balance } = user;
      const result = await this.userModule.findOneAndUpdate(
        {
          email: email,
        },
        {
          phone,
          balance,
        },
        {
          returnOriginal: false,
        },
      );
      return {
        balance: result.balance,
        email: result.email,
        phone: result.phone,
        username: result.username,
      };
    } catch (error) {
      if (error instanceof HttpException)
        throw new BadRequestException('Bad Request');
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async delete(email: string): Promise<string> {
    try {
      await this.userModule.findOneAndDelete({
        email,
      });
      return `Delete user with email: ${email}`;
    } catch (error) {
      if (error instanceof HttpException)
        throw new BadRequestException('Bad Request');
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
