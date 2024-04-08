import { Injectable } from '@nestjs/common';
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
  isLoggedIn = false;

  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async validateUser(credentials: IUserCredentials): Promise<any> {
    const user = await this.userModel.findOne({
      emailAddress: credentials.emailAddress,
    });
    if (user && user.password === credentials.password) {
      return user;
    }
    return null;
  }

  async login(credentials: IUserCredentials): Promise<IUser> {
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
          this.isLoggedIn = true;
        } else {
          const errMsg = 'Email not found or password invalid';
          throw new UnauthorizedException(errMsg);
        }
      })
      .catch((error) => {
        this.isLoggedIn = false;
        return error;
      });
  }

  async register(user: CreateUserDto): Promise<IUser> {
    if (await this.userModel.findOne({ emailAddress: user.emailAddress })) {
      throw new ConflictException('User already exist');
    }
    const createdItem = await this.userModel.create(user);
    return createdItem;
  }
}
