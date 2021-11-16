import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) { }

  async create(userDto: CreateUserDto): Promise<User> {
    return await new this.userModel(userDto).save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id }).exec();
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate({ _id: id }, userDto, { new: true })
  }

  async remove(id: string): Promise<User> {
    return await this.userModel.findOneAndDelete({ _id: id })
  }
}
