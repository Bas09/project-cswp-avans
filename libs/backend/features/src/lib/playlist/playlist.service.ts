import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import {
  Playlist as PlaylistModel,
  PlaylistDocument,
} from '../playlist/schemas/playlist.schema';
import {
  CreatePlaylistDto,
  UpdatePlaylistDto,
} from '@avans-project-cswp/backend/dto';
import {
  Genre,
  ICreatePlaylist,
  IPlaylist,
  PublicStatus,
} from '@avans-project-cswp/shared/api';
import mongoose from 'mongoose';
import { Logger } from '@nestjs/common';

@Injectable()
export class PlaylistService {
  TAG = 'PlaylistService';
  private readonly logger: Logger = new Logger(PlaylistService.name);

  constructor(
    @InjectModel(PlaylistModel.name)
    private playlistModel: Model<PlaylistDocument>
  ) {
    // this.createStandardPlaylist();
    // Initialization logic, if any
  }

  async initialize() {
    //await this.createStandardPlaylist();
  }

  async findAll(): Promise<IPlaylist[]> {
    this.logger.log(`Finding all playlists`, this.TAG);
    const playlists = await this.playlistModel.find().sort({ title: 1 });
    return playlists;
  }

  async findOne(_id: string): Promise<IPlaylist | null> {
    this.logger.log(`Finding playlist with id ${_id}`, this.TAG);
    const playlist = await this.playlistModel.findOne({ _id }).exec();
    if (!playlist) {
      this.logger.debug('Playlist not found');
    }
    return playlist;
  }

  async create(playlist: CreatePlaylistDto): Promise<IPlaylist> {
    Logger.log('create', this.TAG);
    const id = new mongoose.Types.ObjectId();

    const newPlaylist: IPlaylist = {
      ...playlist,
      _id: id.toString(),
      genre: Genre.Default,
      publicStatus: PublicStatus.Default,
      //userId: 'userId', // Set the user ID (you need to replace this with the actual user ID)
    };

    Logger.log(newPlaylist, 'newPlaylist');

    const createdPlaylist = await this.playlistModel.create(newPlaylist);
    return createdPlaylist;
  }

  async update(id: string, playlist: UpdatePlaylistDto): Promise<IPlaylist> {
    Logger.log(`update(${id})`, this.TAG);
    const updatedPlaylist = await this.playlistModel
      .findOneAndUpdate({ _id: id }, playlist, { new: true })
      .exec();
    if (!updatedPlaylist) {
      throw new NotFoundException(`Playlist does not exist!`);
    }
    return updatedPlaylist;
  }

  async delete(id: string): Promise<IPlaylist | null> {
    this.logger.log(`delete playlist with id: (${id})`, this.TAG);

    try {
      const playlist = await this.playlistModel.findByIdAndDelete(id).exec();

      if (!playlist) {
        throw new NotFoundException(`Playlist could not be found!`);
      }

      return (playlist as any).toObject();
    } catch (error) {
      this.logger.error(`Error deleting playlist: ${error}`);
      throw new NotFoundException(`Error deleting playlist`);
    }
  }

  // async createStandardPlaylist(): Promise<IPlaylist> {
  //   const standardPlaylist: ICreatePlaylist = {
  //     title: 'My Standard Playlist',
  //     description: 'This is a standard playlist.',
  //   };

  //   try {
  //     const existingPlaylist = await this.playlistModel.findOne({
  //       title: standardPlaylist.title,
  //     });

  //     if (existingPlaylist) {
  //       throw new HttpException('Playlist already exists', 409);
  //     }

  //     const createdPlaylist = await this.playlistModel.create({
  //       ...standardPlaylist,
  //       dateCreated: new Date(),
  //       // Assuming dateCreated is a property in your IPlaylist interface
  //     });

  //     this.logger.log(`Standard playlist created: ${standardPlaylist.title}`);

  //     return createdPlaylist.toObject() as IPlaylist;
  //   } catch (error) {
  //     this.logger.error(`Error creating standard playlist: ${error}`);
  //     throw new HttpException('Error creating standard playlist', 500);
  //   }
  // }
}
