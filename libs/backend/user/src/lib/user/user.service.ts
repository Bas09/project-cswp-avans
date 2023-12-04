import {
  HttpException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserModel, UserDocument } from './user.schema';
import { IUser, IUserInfo, UserRole } from '@avans-project-cswp/shared/api';
import { CreateUserDto, UpdateUserDto } from '@avans-project-cswp/backend/dto';

@Injectable()
export class UserService implements OnModuleInit {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>
  ) {}

  async onModuleInit() {
    // await this.createStandardUser();
  }

  async findAll(): Promise<IUserInfo[]> {
    this.logger.log(`Finding all items`);
    const items = await this.userModel.find();
    return items;
  }

  async findOne(_id: string): Promise<IUser | null> {
    this.logger.log(`finding user with id ${_id}`);
    const item = await this.userModel.findOne({ _id }).exec();
    if (!item) {
      this.logger.debug('Item not found');
    }
    return item;
  }

  async findOneByEmail(email: string): Promise<IUserInfo | null> {
    this.logger.log(`Finding user by email ${email}`);
    const item = this.userModel
      .findOne({ emailAddress: email })
      .select('-password')
      .exec();
    return item;
  }

  async create(user: CreateUserDto): Promise<IUserInfo> {
    this.logger.log(`Create user ${user.firstName} ${user.lastName}`);
    const createdItem = await this.userModel.create(user);
    return createdItem;
  }

  async update(_id: string, user: UpdateUserDto): Promise<IUserInfo | null> {
    this.logger.log(`Update user ${user.firstName} ${user.lastName}`);
    return this.userModel.findByIdAndUpdate({ _id }, user);
  }

  async createStandardUser(): Promise<IUserInfo> {
    const standardUser: CreateUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      password: 'securepassword',
      emailAddress: 'john.doe@example.com',
    };

    try {
      const existingUser = await this.userModel.findOneAndUpdate({
        emailAddress: standardUser.emailAddress,
      });

      this.logger.log(`Existing user: ${existingUser}`); // Add this line

      if (existingUser) {
        // throw new HttpException('User already exists', 409);
      }

      const createdItem = await this.userModel.create(standardUser);
      this.logger.log(
        `Standard user created: ${standardUser.firstName} ${standardUser.lastName}`
      );
      return createdItem;
    } catch (error) {
      this.logger.error(`Error creating standard user: ${error}`);
      throw new HttpException('Error creating standard user', 500);
    }
  }
}
