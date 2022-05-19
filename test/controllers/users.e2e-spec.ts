import 'dotenv/config';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../../src/app.module';

describe('users e2e', () => {
  let app: INestApplication;

  const users = [
    {
      firstName: 'Rahul',
      email: 'rahul@gmail.com',
      password: 'Rahul@123',
      phoneNumber: '9090909090',
    },
  ];

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          schema: process.env.DB_SCHEMA,
          entities: ['src/**/*.entity{.ts,.js}'],
        }),
        AppModule,
      ],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET users', () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });

  it('/GET user by id', () => {
    return request(app.getHttpServer()).get('/users/1').expect(200);
  });

  it('/POST user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(users[0])
      .expect(201);
  });
});
