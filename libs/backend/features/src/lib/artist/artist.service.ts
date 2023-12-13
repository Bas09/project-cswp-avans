import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Artist as ArtistModel, ArtistDocument } from './schemas/artist.schema';
import {
  CreateArtistDto,
  UpdateArtistDto,
} from '@avans-project-cswp/backend/dto';
import {
  ArtistGenre,
  ICreateArtist,
  IArtist,
} from '@avans-project-cswp/shared/api';
import mongoose from 'mongoose';
import { Logger } from '@nestjs/common';

@Injectable()
export class ArtistService {
  TAG = 'ArtistService';
  private readonly logger: Logger = new Logger(ArtistService.name);

  constructor(
    @InjectModel(ArtistModel.name)
    private artistModel: Model<ArtistDocument>
  ) {
    // Initialization logic, if any
  }

  async findAll(): Promise<IArtist[]> {
    this.logger.log(`Finding all artists`, this.TAG);
    const artists = await this.artistModel.find().sort({ name: 1 });
    return artists;
  }

  async findOne(_id: string): Promise<IArtist | null> {
    this.logger.log(`Finding artist with id ${_id}`, this.TAG);
    const artist = await this.artistModel.findOne({ _id }).exec();
    if (!artist) {
      this.logger.debug('Artist not found');
    }
    return artist;
  }

  async create(artist: CreateArtistDto): Promise<IArtist> {
    Logger.log('create', this.TAG);
    const id = new mongoose.Types.ObjectId();

    const newArtist: ICreateArtist = {
      ...artist,
      _id: id.toString(),
    };

    Logger.log(newArtist, 'newArtist');

    const createdArtist = await this.artistModel.create(newArtist);
    return createdArtist;
  }

  async update(id: string, artist: UpdateArtistDto): Promise<IArtist> {
    Logger.log(`update(${id})`, this.TAG);
    const updatedArtist = await this.artistModel
      .findOneAndUpdate({ _id: id }, artist, { new: true })
      .exec();
    if (!updatedArtist) {
      throw new NotFoundException(`Artist does not exist!`);
    }
    return updatedArtist;
  }

  async delete(id: string): Promise<IArtist | null> {
    this.logger.log(`delete artist with id: (${id})`, this.TAG);

    try {
      const artist = await this.artistModel.findByIdAndDelete(id).exec();

      if (!artist) {
        throw new NotFoundException(`Artist could not be found!`);
      }

      return (artist as any).toObject();
    } catch (error) {
      this.logger.error(`Error deleting artist: ${error}`);
      throw new NotFoundException(`Error deleting artist`);
    }
  }
}
