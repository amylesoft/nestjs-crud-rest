import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { UserRepository } from '../../src/users/user.repository';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  const mockUser = { phoneNo: '1234567890', firstName: 'Jay', lastName: 'Khant' };

  const mockUserRepository = {
    create: jest.fn().mockImplementation((userDto) => userDto),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockImplementation((id) => {
      return {
        id,
        ...mockUser
      }
    }),
    update: jest.fn().mockImplementation((id, userDto) => {
      return {
        id,
        ...userDto,
      };
    }),
    remove: jest.fn().mockImplementation((id) => {
      return {
        id,
        ...mockUser
      };
    }),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [UserRepository]
    })
      .overrideProvider(UserRepository).useValue(mockUserRepository)
      .compile();

    connection = await moduleFixture.get(getConnectionToken());

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await connection.close(/*force:*/ true); // <-- important
  });

  describe('/users (GET)', () => {
    it('should find users', () => {
      const id = 1
      const phoneNo = '1234567890'
      return request(app.getHttpServer())
        .get('/users')
        .query({ id: id, phoneNo: phoneNo })
        .expect(HttpStatus.OK)
        .expect([mockUser]);
    });

    it('should find user by id', () => {
      const id = "1"
      return request(app.getHttpServer())
        .get(`/users/${id}`)
        .expect(HttpStatus.OK)
        .expect({
          id,
          ...mockUser
        });
    });
  });

  describe('/users (POST)', () => {
    it('should create user', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send(mockUser)
        .expect(HttpStatus.CREATED)
        .expect({
          ...mockUser
        });
    });
  });

  describe('/users (UPDATE)', () => {
    it('should update user', async () => {
      const id = "1"
      await request(app.getHttpServer())
        .patch(`/users/${id}`)
        .send(mockUser)
        .expect(HttpStatus.OK)
        .expect({ id, ...mockUser })
    });
  });

  describe('/users (DELETE)', () => {
    it('should delete user', async () => {
      const id = "1"
      await request(app.getHttpServer())
        .delete(`/users/${id}`)
        .query({ id })
        .expect(HttpStatus.OK)
        .expect({ id, ...mockUser })
    });
  });
});
