import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Song as SongModel, SongDocument } from '../song/schemas/song.schema';
import { CreateSongDto, UpdateSongDto } from '@avans-project-cswp/backend/dto';
import { SongGenre, ICreateSong, ISong } from '@avans-project-cswp/shared/api';
import mongoose from 'mongoose';
import { Logger } from '@nestjs/common';

@Injectable()
export class SongService {
  TAG = 'SongService';
  private readonly logger: Logger = new Logger(SongService.name);

  constructor(
    @InjectModel(SongModel.name)
    private songModel: Model<SongDocument>
  ) {
    // Initialization logic, if any
  }

  async findAll(): Promise<ISong[]> {
    this.logger.log(`Finding all songs`, this.TAG);
    const songs = await this.songModel.find().sort({ title: 1 });
    return songs;
  }

  async findOne(_id: string): Promise<ISong | null> {
    this.logger.log(`Finding song with id ${_id}`, this.TAG);
    const song = await this.songModel.findOne({ _id }).exec();
    if (!song) {
      this.logger.debug('Song not found');
    }
    return song;
  }

  async create(song: CreateSongDto): Promise<ISong> {
    Logger.log('create', this.TAG);
    const id = new mongoose.Types.ObjectId();

    const newSong: ICreateSong = {
      ...song,
      _id: id.toString(),
    };

    Logger.log(newSong, 'newSong');

    const createdSong = await this.songModel.create(newSong);
    return createdSong;
  }

  async update(id: string, song: UpdateSongDto): Promise<ISong> {
    Logger.log(`update(${id})`, this.TAG);
    const updatedSong = await this.songModel
      .findOneAndUpdate({ _id: id }, song, { new: true })
      .exec();
    if (!updatedSong) {
      throw new NotFoundException(`Song does not exist!`);
    }
    return updatedSong;
  }

  async delete(id: string): Promise<ISong | null> {
    this.logger.log(`delete song with id: (${id})`, this.TAG);

    try {
      const song = await this.songModel.findByIdAndDelete(id).exec();

      if (!song) {
        throw new NotFoundException(`Song could not be found!`);
      }

      return (song as any).toObject();
    } catch (error) {
      this.logger.error(`Error deleting song: ${error}`);
      throw new NotFoundException(`Error deleting song`);
    }
  }
}
