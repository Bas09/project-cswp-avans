import {
  Body,
  Controller,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '@avans-project-cswp/backend/dto';
import { User } from '../user/user.schema';

import { UserService } from './../user/user.service';
import { AuthService } from './../auth/auth.service';
import {
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
//import { ILoginAdmin, ILoginUser } from '@sportify-nx/shared/api';
import { Public } from './decorators/public.decorator';
import { ILoginUser } from '@avans-project-cswp/shared/api';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  // @Public()
  // @Post('login')
  // create(@Body() data: CreateUserDto): Promise<User> {
  //   return this.userService.create(data);
  // }

  @Public()
  @Post('login')
  login(
    @Body() data: ILoginUser
  ): Promise<{ access_token: string; user: User }> {
    return this.authService.login(data.emailAddress, data.password);
  }

  // @Public()
  // @Post('login/admin')
  // loginAdmin(@Body() data: ILoginAdmin): Promise<{ access_token: string; admin: Admin }> {
  //   return this.authService.loginAdmin(data.email, data.password);
  // }

  // @Public()
  // @Get('token')
  // async validateToken(@Headers('Authorization') authorizationHeader: string): Promise<User | Admin | null> {
  //   const token = authorizationHeader.replace('Bearer ', ''); // Extract the token from the Authorization header

  //   try {
  //     const user = await this.authService.validateToken(token);
  //     return user;
  //   } catch (error) {
  //     throw new UnauthorizedException();
  //   }
  // }
}
