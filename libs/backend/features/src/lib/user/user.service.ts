import { InjectModel } from '@nestjs/mongoose';
import {
  ICreateUser,
  IUser,
  IUserInfo,
  UserGender,
  UserRole,
} from '@avans-project-cswp/shared/api';
import { CreateUserDto, UpdateUserDto } from '@avans-project-cswp/backend/dto';
import mongoose, { Model } from 'mongoose';
import { User as UserModel, UserDocument } from './user.schema';
import { HttpException, Logger } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  TAG = 'UserService';
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>
  ) {
    //this.createStandardUser();
  }

  async findAll(): Promise<IUser[]> {
    this.logger.log(`Finding all items`, this.TAG);
    const items = await this.userModel.find().sort({ name: 1 });
    return items;
  }

  async findOne(_id: string): Promise<IUser | null> {
    this.logger.log(`finding user with id ${_id}`, this.TAG);
    const user = await this.userModel.findOne({ _id }).exec();
    if (!user) {
      this.logger.debug('Item not found');
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<IUserInfo | null> {
    this.logger.log(`Finding user by email ${email}`, this.TAG);
    const item = this.userModel
      .findOne({ emailAddress: email })
      .select('-password')
      .exec();
    return item;
  }

  // async create(user: CreateUserDto): Promise<IUserInfo> {
  //   this.logger.log(`Create user ${user.name}`);
  //   const createdItem = await this.userModel.create(user);
  //   return createdItem;
  // }

  async create(
    user: Pick<IUser, 'name' | 'emailAddress' | 'password'>
  ): Promise<IUser> {
    Logger.log('create', this.TAG);
    var id = new mongoose.Types.ObjectId();

    const newUser: IUser = {
      ...user,
      _id: id.toString(),
      role: UserRole.Unknown,
      gender: UserGender.Unknown,
    };

    Logger.log(newUser, 'newUser');

    const createdUser = await this.userModel.create(newUser);
    return createdUser;
  }

  // async update(_id: string, user: UpdateUserDto): Promise<IUserInfo | null> {
  //   this.logger.log(`Update user ${user.name}`);
  //   return this.userModel.findByIdAndUpdate({ _id }, user);
  // }

  async update(id: string, user: Partial<IUser>): Promise<IUser> {
    Logger.log(`update(${id})`, this.TAG);
    const updatedUser = await this.userModel
      .findOneAndUpdate({ _id: id }, user, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User does not be exist!`);
    }
    return updatedUser;
  }

  async delete(_id: string): Promise<IUser | null> {
    this.logger.log(`delete user with id: (${_id})`, this.TAG);

    try {
      const user = await this.userModel.findByIdAndDelete(_id).exec();

      if (!user) {
        throw new NotFoundException(`User could not be found!`);
      }

      // Assuming `user` here is an instance of IUser
      return (user as any).toObject();
    } catch (error) {
      this.logger.error(`Error deleting user: ${error}`);
      throw new NotFoundException(`Error deleting user`);
    }
  }

  // one time use with new db
  async createStandardUser(): Promise<IUserInfo> {
    const standardUser: ICreateUser = {
      name: 'John Doe',
      password: 'securepassword',
      emailAddress: 'john.doe@example.com',
    };

    try {
      const existingUser = await this.userModel.findOne({
        emailAddress: standardUser.emailAddress,
      });

      if (existingUser) {
        throw new HttpException('User already exists', 409);
      }

      const createdItem = await this.userModel.create({
        ...standardUser,
        role: UserRole.Guest,
        gender: UserGender.Unknown,
      });

      this.logger.log(`Standard user created: ${standardUser.name}`);

      // Assuming IUserInfo includes everything from ICreateUser
      return createdItem.toObject() as IUserInfo;
    } catch (error) {
      this.logger.error(`Error creating standard user: ${error}`);
      throw new HttpException('Error creating standard user', 500);
    }
  }
}
