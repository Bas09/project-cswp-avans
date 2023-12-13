import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';

import { IPlaylist } from '@avans-project-cswp/shared/api';
import {
  CreatePlaylistDto,
  UpdatePlaylistDto,
} from '@avans-project-cswp/backend/dto';

import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiHeader,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('playlist')
@Controller('playlist')
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all Playlists' })
  @ApiResponse({ status: 200, description: 'Return all Playlists' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async findAll(): Promise<IPlaylist[]> {
    return this.playlistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Playlist by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the playlist to retrieve',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Return a playlist by its ID.' })
  async findOne(@Param('id') id: string): Promise<IPlaylist | null> {
    return this.playlistService.findOne(id);
  }

  @Post('')
  @ApiOperation({ summary: 'Creates a new playlist' })
  @ApiBody({ type: CreatePlaylistDto })
  @ApiResponse({ status: 201, description: 'Creates new playlist' })
  async create(@Body() playlist: CreatePlaylistDto): Promise<IPlaylist> {
    return this.playlistService.create(playlist);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a playlist by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the playlist to delete',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Deletes a playlist by ID.' })
  delete(@Param('id') id: string): void {
    console.log('PLAYLIST DELETION PLAYLIST.CONTROLLER');
    this.playlistService.delete(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a playlist by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the playlist to update',
    type: 'string',
  })
  @ApiBody({ type: UpdatePlaylistDto })
  @ApiResponse({ status: 200, description: 'Updates a playlist by ID.' })
  async update(
    @Param('id') id: string,
    @Body() playlist: UpdatePlaylistDto
  ): Promise<IPlaylist | null> {
    return this.playlistService.update(id, playlist);
  }
}
