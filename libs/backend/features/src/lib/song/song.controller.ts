import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SongService } from './song.service';

import { ISong } from '@avans-project-cswp/shared/api';
import { CreateSongDto, UpdateSongDto } from '@avans-project-cswp/backend/dto';

import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('song')
@Controller('song')
export class SongController {
  constructor(private songService: SongService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all Songs' })
  @ApiResponse({ status: 200, description: 'Return all Songs' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async findAll(): Promise<ISong[]> {
    return this.songService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Song by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the song to retrieve',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Return a song by its ID.' })
  async findOne(@Param('id') id: string): Promise<ISong | null> {
    return this.songService.findOne(id);
  }

  @Post('')
  @ApiOperation({ summary: 'Creates a new song' })
  @ApiBody({ type: CreateSongDto })
  @ApiResponse({ status: 201, description: 'Creates new song' })
  async create(@Body() song: CreateSongDto): Promise<ISong> {
    return this.songService.create(song);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a song by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the song to delete',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Deletes a song by ID.' })
  delete(@Param('id') id: string): void {
    console.log('SONG DELETION SONG.CONTROLLER');
    this.songService.delete(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a song by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the song to update',
    type: 'string',
  })
  @ApiBody({ type: UpdateSongDto })
  @ApiResponse({ status: 200, description: 'Updates a song by ID.' })
  async update(
    @Param('id') id: string,
    @Body() song: UpdateSongDto
  ): Promise<ISong | null> {
    return this.songService.update(id, song);
  }
}
