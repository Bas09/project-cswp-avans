import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Logger,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators/decorators';
import { IUser } from '@avans-project-cswp/shared/api';
import { IUserCredentials } from '@avans-project-cswp/shared/api';
import { CreateUserDto } from '@avans-project-cswp/backend/dto';
import { UserExistGuard } from '@avans-project-cswp/backend/features';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get hello message' })
  async hello(): Promise<string> {
    return 'hello';
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async login(@Body() credentials: IUserCredentials): Promise<IUser> {
    this.logger.log('Login');
    return await this.authService.login(credentials);
  }

  @Public()
  @UseGuards(UserExistGuard)
  @Post('register')
  @ApiOperation({ summary: 'Register' })
  async register(@Body() user: CreateUserDto): Promise<IUser> {
    this.logger.log('Register');
    return await this.authService.register(user);
  }
}
