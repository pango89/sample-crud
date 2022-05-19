import { TestingModule, Test } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { UsersController } from '../../src/controllers/users.controller';
import { UserAddDto } from '../../src/dtos/user.dto';
import { UsersService } from '../../src/services/users.service';

describe('Users Controller', () => {
  let testingModule: TestingModule;
  let usersController: UsersController;
  let spyUsersService: UsersService;

  const userDtos = [
    {
      id: 1,
      firstName: 'Rohit',
      email: 'rohit@gmail.com',
      phoneNumber: '9912345678',
    },
    {
      id: 2,
      firstName: 'Virat',
      email: 'virat@gmail.com',
      phoneNumber: '9876543210',
    },
  ];

  const newUser = {
    firstName: 'Pankaj',
    email: 'pankaj@gmail.com',
    password: 'Pankaj@1234',
    phoneNumber: '9988776655',
  };

  const result = {
    data: userDtos,
    count: 2,
    offset: 0,
    limit: 2,
  };

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getAll: jest.fn(() => result),
            getById: jest.fn(() => userDtos[0]),
            add: jest.fn(() => newUser),
          },
        },
      ],
    }).compile();

    usersController = testingModule.get<UsersController>(UsersController);
    spyUsersService = testingModule.get<UsersService>(UsersService);
  });

  describe('getAll', () => {
    it('should return all users', async () => {
      const queryParams = {
        offset: 0,
        limit: 1,
      };

      const response = await usersController.getAll(queryParams);

      expect(spyUsersService.getAll).toHaveBeenCalledTimes(1);
      expect(spyUsersService.getAll).toHaveLastReturnedWith(result);

      expect(response.data).toEqual(result.data);
      expect(response.offset).toEqual(result.offset);
      expect(response.limit).toEqual(result.limit);
    });
  });

  describe('getById', () => {
    it('should return user by id', async () => {
      const response = await usersController.getById(1);

      expect(spyUsersService.getById).toHaveBeenCalledTimes(1);
      expect(spyUsersService.getById).toHaveBeenCalledWith(1);
      expect(spyUsersService.getById).toHaveLastReturnedWith(result.data[0]);
      expect(response).toEqual(result.data[0]);
    });
  });

  describe('add', () => {
    it('should add a user', async () => {
      const userAddDto = plainToClass(UserAddDto, newUser);
      const response = await usersController.add(userAddDto);

      expect(spyUsersService.add).toHaveBeenCalledTimes(1);
      expect(response.firstName).toEqual(userAddDto.firstName);
      expect(response.email).toEqual(userAddDto.email);
      expect(response.phoneNumber).toEqual(userAddDto.phoneNumber);
    });
  });
});
