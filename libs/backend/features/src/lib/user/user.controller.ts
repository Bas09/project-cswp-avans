import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';

import { IUserInfo, IUser } from '@avans-project-cswp/shared/api';
import { CreateUserDto, UpdateUserDto } from '@avans-project-cswp/backend/dto';
import { UserExistGuard } from './user-exists.guard';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiHeader,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({ status: 200, description: 'Return all Users' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async findAll(): Promise<IUser[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to retrieve',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Return a user by its ID.' })
  async findOne(@Param('id') id: string): Promise<IUser | null> {
    return this.userService.findOne(id);
  }

  @Post('')
  // @UseGuards(UserExistGuard)
  @ApiOperation({ summary: 'Creates a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Creates new user' })
  async create(@Body() user: CreateUserDto): Promise<IUser> {
    return this.userService.create(user);
  }

  // needs more work!!!
  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a user by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to delete',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Deletes a user by ID.' })
  delete(@Param('id') id: string): void {
    console.log('USER DELETION USER.CONTROLLER');
    this.userService.delete(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to update',
    type: 'string',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Updates a user by ID.' })
  async update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto
  ): Promise<IUser | null> {
    return this.userService.update(id, user);
  }
}
