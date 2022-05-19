import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatedResponse } from '../dtos/paginatedResponse.dto';
import { PaginationRequestQuery } from '../dtos/paginationQuery.dto';
import { UserAddDto, UserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async getAll(
    query: PaginationRequestQuery,
  ): Promise<PaginatedResponse<UserDto>> {
    const { offset, limit } = query;
    const [users, count] = await this.usersRepository.findAndCount({
      where: [],
      order: { id: 'ASC' },
      skip: offset,
      take: limit,
    });

    const userDtos = users.map(user => UserDto.fromEntity(user));
    return new PaginatedResponse(userDtos, count, offset, limit);
  }

  public async getById(id: number): Promise<UserDto> {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException(`User not found having id = ${id}`);
    return UserDto.fromEntity(user);
  }

  public async add(userAddDto: UserAddDto): Promise<UserDto> {
    const saved = await this.usersRepository.save(userAddDto.toEntity());
    return UserDto.fromEntity(saved);
  }
}
