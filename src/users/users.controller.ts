import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('users')
@ApiBadRequestResponse({ description: 'Validation errors' })
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiCreatedResponse({ type: CreateUserDto, description: 'User created' })
  async create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @Get()
  @ApiOkResponse({ type: CreateUserDto, description: 'Get list of all user' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({ type: CreateUserDto, description: 'Get user by id' })
  async findOne(
    @Param('id') id: string,
  ) {
    return await this.usersService.findOne(id);
  }

  @Patch(":id")
  @ApiOkResponse({ type: UpdateUserDto, description: 'User updated' })
  async update(
    @Param('id') id: string,
    @Body() userDto: UpdateUserDto
  ) {
    return await this.usersService.update(id, userDto);
  }

  @Delete(":id")
  @ApiOkResponse({ type: CreateUserDto, description: 'User deleted' })
  async remove(
    @Param('id') id: string,
  ) {
    return await this.usersService.remove(id);
  }
}
