import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Party as PartyModel, PartyDocument } from './schemas/party.schema';
import {
  CreatePartyDto,
  UpsertPartyDto,
  UpdatePartyDto,
} from '@avans-project-cswp/backend/dto';
import { ICreateParty, IParty } from '@avans-project-cswp/shared/api';
import mongoose from 'mongoose';
import { Logger } from '@nestjs/common';

@Injectable()
export class PartyService {
  TAG = 'PartyService';
  private readonly logger: Logger = new Logger(PartyService.name);

  constructor(
    @InjectModel(PartyModel.name)
    private partyModel: Model<PartyDocument>
  ) {
    // Initialization logic, if any
  }

  async findAll(): Promise<IParty[]> {
    this.logger.log(`Finding all party's`, this.TAG);
    const party = await this.partyModel.find().sort({ name: 1 });
    return party;
  }

  async findOne(_id: string): Promise<IParty | null> {
    this.logger.log(`Finding party with id ${_id}`, this.TAG);
    const party = await this.partyModel.findOne({ _id }).exec();
    if (!party) {
      this.logger.debug('Party not found');
    }
    return party;
  }

  async create(party: CreatePartyDto): Promise<IParty> {
    Logger.log('create', this.TAG);
    const id = new mongoose.Types.ObjectId();

    const newParty: ICreateParty = {
      ...party,
      _id: id.toString(),
    };

    Logger.log(newParty, 'newParty');

    const createdParty = await this.partyModel.create(newParty);
    return createdParty;
  }

  async update(id: string, party: UpdatePartyDto): Promise<IParty> {
    Logger.log(`update(${id})`, this.TAG);
    const updatedParty = await this.partyModel
      .findOneAndUpdate({ _id: id }, party, { new: true })
      .exec();
    if (!updatedParty) {
      throw new NotFoundException(`Party does not exist!`);
    }
    return updatedParty;
  }

  async delete(id: string): Promise<IParty | null> {
    this.logger.log(`delete party with id: (${id})`, this.TAG);

    try {
      const party = await this.partyModel.findByIdAndDelete(id).exec();

      if (!party) {
        throw new NotFoundException(`Party could not be found!`);
      }

      return (party as any).toObject();
    } catch (error) {
      this.logger.error(`Error deleting party: ${error}`);
      throw new NotFoundException(`Error deleting party`);
    }
  }
}
