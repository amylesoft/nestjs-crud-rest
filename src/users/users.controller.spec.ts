import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;

  const mockUser = { phoneNo: '1235467890', firstName: 'Jay', lastName: 'Khant' };

  const mockUserService = {
    create: jest.fn().mockImplementation((userDto: CreateUserDto) => {
      return userDto;
    }),
    findAll: jest.fn().mockImplementation(() => {
      return [mockUser]
    }),
    findOne: jest.fn().mockImplementation((id: string) => {
      return {
        id,
        ...mockUser
      };
    }),
    update: jest
      .fn()
      .mockImplementation((id: String, userDto: UpdateUserDto) => {
        return {
          id,
          ...userDto,
        };
      }),
    remove: jest.fn().mockImplementation((id: String) => {
      return {
        id
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService).useValue(mockUserService)
      .compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should create user', async () => {
    expect(await usersController.create(mockUser)).toEqual(
      mockUser
    );
  });

  it('should findAll user', async () => {
    expect(await usersController.findAll()).toEqual([mockUser]);
  });


  it('should find user by id', async () => {
    const id = "1"
    expect(await usersController.findOne(id)).toEqual({
      id,
      ...mockUser
    });
  });


  it('should update user', async () => {
    const updateUserDto = { firstName: 'Jay', lastName: 'Khant' };
    const id = "1"
    expect(await usersController.update(id, updateUserDto)).toEqual(
      {
        id,
        ...updateUserDto
      }
    );
  });

  it('should remove user', async () => {
    const id = "1"
    expect(await usersController.remove(id)).toEqual(
      {
        id
      }
    )
  });
});
