import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUserInfo, IUser } from '@avans-project-cswp/shared/api';
import { CreateUserDto, UpdateUserDto } from '@avans-project-cswp/backend/dto';
import { UserExistGuard } from './user-exists.guard'; // If you have this guard

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<IUserInfo[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IUser | null> {
    return this.userService.findOne(id);
  }

  @Post('')
  @UseGuards(UserExistGuard) // You might want to check if the user already exists
  create(@Body() user: CreateUserDto): Promise<IUserInfo> {
    return this.userService.create(user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto
  ): Promise<IUserInfo | null> {
    return this.userService.update(id, user);
  }

  // New method for creating a standard user
  @Post('createStandardUser')
  async createStandardUser(): Promise<IUserInfo> {
    return this.userService.createStandardUser();
  }
}

// import {
//   Body,
//   Controller,
//   Get,
//   Param,
//   Post,
//   Put,
//   UseGuards,
// } from '@nestjs/common';
// import { UserService } from './user.service';
// import { IUserInfo, IUser } from '@avans-project-cswp/shared/api';
// import { CreateUserDto, UpdateUserDto } from '@avans-project-cswp/backend/dto';
// import { UserExistGuard } from './user-exists.guard';

// @Controller('user')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @Get()
//   async findAll(): Promise<IUserInfo[]> {
//     return this.userService.findAll();
//   }

//   // this method should precede the general getOne method, otherwise it never matches
//   // @Get('self')
//   // async getSelf(@InjectToken() token: Token): Promise<IUser> {
//   //     const result = await this.userService.getOne(token.id);
//   //     return result;
//   // }

//   @Get(':id')
//   async findOne(@Param('id') id: string): Promise<IUser | null> {
//     return this.userService.findOne(id);
//   }

//   @Post('')
//   @UseGuards(UserExistGuard)
//   create(@Body() user: CreateUserDto): Promise<IUserInfo> {
//     return this.userService.create(user);
//   }

//   @Put(':id')
//   update(
//     @Param('id') id: string,
//     @Body() user: UpdateUserDto
//   ): Promise<IUserInfo | null> {
//     return this.userService.update(id, user);
//   }
// }
