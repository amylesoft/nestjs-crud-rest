import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) { }

  async create(userDto: CreateUserDto) {
    return await this.userRepository.create(userDto)
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll()
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne(id)
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.update(id, userDto)
  }

  async remove(id: string): Promise<User> {
    return await this.userRepository.remove(id)
  }
}
