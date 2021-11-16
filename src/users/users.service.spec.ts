import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let userService: UsersService;

  const mockUser = { phoneNo: '1235467890', firstName: 'Jay', lastName: 'Khant' };

  const mockUserRepository = {
    create: jest.fn().mockImplementation((userDto) => userDto),
    findAll: jest.fn().mockImplementation(() => {
      return [
        mockUser
      ]
    }),
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
        id
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UserRepository],
    })
      .overrideProvider(UserRepository).useValue(mockUserRepository)
      .compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create user', async () => {
    expect(await userService.create(mockUser)).toEqual({
      ...mockUser,
    });
  });

  it('should findAll user', async () => {
    expect(await userService.findAll()).toEqual([mockUser]);
  });

  it('should find user by id', async () => {
    const id = "1"
    expect(await userService.findOne(id)).toEqual({
      id,
      ...mockUser
    });
  });

  it('should update user', async () => {
    const updateUserDto = { firstName: 'Jay', lastName: 'Khant' };
    const id = "1"
    expect(await userService.update(id, updateUserDto)).toEqual({
      id,
      ...updateUserDto,
    });
  });

  it('should remove user', async () => {
    const id = "1"
    expect(await userService.remove(id)).toEqual({
      id,
    });
  });
});
