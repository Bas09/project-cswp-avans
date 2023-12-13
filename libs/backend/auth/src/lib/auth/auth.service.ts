import { Injectable, Logger } from '@nestjs/common';
import {
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import {
  User as UserModel,
  UserDocument,
} from '@avans-project-cswp/backend/features';

import { JwtService } from '@nestjs/jwt';
import { IUserCredentials, IUser } from '@avans-project-cswp/shared/api';
import { CreateUserDto } from '@avans-project-cswp/backend/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  public currentUser$ = new BehaviorSubject<IUser | null>(null);
  private readonly CURRENT_USER = 'currentUser';

  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async validateUser(credentials: IUserCredentials): Promise<any> {
    this.logger.log('validateUser');
    const user = await this.userModel.findOne({
      emailAddress: credentials.emailAddress,
    });
    if (user && user.password === credentials.password) {
      return user;
    }
    return null;
  }

  async login(credentials: IUserCredentials): Promise<IUser> {
    this.logger.log('login ' + credentials.emailAddress);
    return await this.userModel
      .findOne({
        emailAddress: credentials.emailAddress,
      })
      .select('+password')
      .exec()
      .then((user) => {
        if (user && user.password === credentials.password) {
          const payload = {
            user_id: user._id,
          };
          return {
            _id: user._id,
            name: user.name,
            role: user.role,
            gender: user.gender,
            emailAddress: user.emailAddress,
            token: this.jwtService.sign(payload),
          };
        } else {
          const errMsg = 'Email not found or password invalid';
          this.logger.debug(errMsg);
          throw new UnauthorizedException(errMsg);
        }
      })
      .catch((error) => {
        return error;
      });
  }

  async register(user: CreateUserDto): Promise<IUser> {
    this.logger.log(`Register user ${user.name}`);
    if (await this.userModel.findOne({ emailAddress: user.emailAddress })) {
      this.logger.debug('user exists');
      throw new ConflictException('User already exist');
    }
    this.logger.debug('User not found, creating');
    const createdItem = await this.userModel.create(user);
    return createdItem;
  }
}
