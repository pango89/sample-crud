import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { PaginatedResponse } from '../dtos/paginatedResponse.dto';
import { PaginationRequestQuery } from '../dtos/paginationQuery.dto';
import { UserAddDto, UserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async getAll(
    @Query(new ValidationPipe({ transform: true }))
    query: PaginationRequestQuery,
  ): Promise<PaginatedResponse<UserDto>> {
    return await this.usersService.getAll(query);
  }

  @Get(':id')
  public async getById(
    @Param('id', new ValidationPipe({ transform: true })) id: number,
  ): Promise<UserDto> {
    return await this.usersService.getById(id);
  }

  @Post()
  public async add(
    @Body(new ValidationPipe({ transform: true })) userAddDto: UserAddDto,
  ): Promise<UserDto> {
    return await this.usersService.add(userAddDto);
  }
}
