import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';

import { IArtist } from '@avans-project-cswp/shared/api';
import {
  CreateArtistDto,
  UpdateArtistDto,
} from '@avans-project-cswp/backend/dto';

import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all Artists' })
  @ApiResponse({ status: 200, description: 'Return all Artists' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async findAll(): Promise<IArtist[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Artist by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the artist to retrieve',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Return an artist by its ID.' })
  async findOne(@Param('id') id: string): Promise<IArtist | null> {
    return this.artistService.findOne(id);
  }

  @Post('')
  @ApiOperation({ summary: 'Creates a new artist' })
  @ApiBody({ type: CreateArtistDto })
  @ApiResponse({ status: 201, description: 'Creates new artist' })
  async create(@Body() artist: CreateArtistDto): Promise<IArtist> {
    return this.artistService.create(artist);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes an artist by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the artist to delete',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Deletes an artist by ID.' })
  delete(@Param('id') id: string): void {
    console.log('ARTIST DELETION ARTIST.CONTROLLER');
    this.artistService.delete(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an artist by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the artist to update',
    type: 'string',
  })
  @ApiBody({ type: UpdateArtistDto })
  @ApiResponse({ status: 200, description: 'Updates an artist by ID.' })
  async update(
    @Param('id') id: string,
    @Body() artist: UpdateArtistDto
  ): Promise<IArtist | null> {
    return this.artistService.update(id, artist);
  }
}
