import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { UserAddDto, UserDto } from '../../src/dtos/user.dto';
import { User } from '../../src/entities/user.entity';
import { UsersService } from '../../src/services/users.service';

describe('Users Service', () => {
  let testingModule: TestingModule;
  let usersService: UsersService;
  let spyUsersRepository: Repository<User>;

  const newUser = {
    firstName: 'Rohit',
    email: 'rohit@gmail.com',
    password: 'cpms@123',
    phoneNumber: '9912345678',
  };

  const users = [
    {
      id: 1,
      firstName: 'Rohit',
      email: 'rohit@gmail.com',
      passwordHash: '7ywB+y/sqg5BIwDkyf68ibVpGBRAHBPwPd050QqWhzA=',
      phoneNumber: '9912345678',
    },
  ];

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          //   useValue: {
          //     find: jest.fn(() => users),
          //   },
          useFactory: () => ({
            find: jest.fn(() => users),
            findAndCount: jest.fn(() => [users, users.length]),
            findOne: jest.fn(() => users[0]),
            save: jest.fn(() => users[0]),
          }),
        },
      ],
    }).compile();

    usersService = testingModule.get<UsersService>(UsersService);
    spyUsersRepository = testingModule.get<Repository<User>>(
      getRepositoryToken(User),
    );
  });

  describe('getAllUsers', () => {
    it('should get all users', async () => {
      const res = await usersService.getAll({});

      expect(spyUsersRepository.findAndCount).toHaveReturnedWith([
        users,
        users.length,
      ]);
      expect(spyUsersRepository.findAndCount).toHaveBeenCalledTimes(1);

      expect(res.data[0]).toEqual(UserDto.fromEntity(users[0]));
    });
  });

  describe('getUserById', () => {
    it('should get a user by id', async () => {
      const res = await usersService.getById(1);

      expect(spyUsersRepository.findOne).toHaveReturnedWith(users[0]);
      expect(spyUsersRepository.findOne).toHaveBeenCalledTimes(1);

      expect(res).toEqual(UserDto.fromEntity(users[0]));
    });
  });

  describe('add', () => {
    it('should add a new user', async () => {
      const userAddDto = plainToClass(UserAddDto, newUser);
      const res = await usersService.add(userAddDto);

      expect(spyUsersRepository.save).toHaveBeenCalledTimes(1);
      expect(spyUsersRepository.save).toHaveBeenLastCalledWith(
        userAddDto.toEntity(),
      );
      expect(res).toEqual(UserDto.fromEntity(users[0]));
    });
  });
});
