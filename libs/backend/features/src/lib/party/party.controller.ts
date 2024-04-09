import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PartyService } from './party.service';

import { IParty } from '@avans-project-cswp/shared/api';
import {
  CreatePartyDto,
  UpdatePartyDto,
} from '@avans-project-cswp/backend/dto';

import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('party')
@Controller('party')
export class PartyController {
  constructor(private partyService: PartyService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all Partys' })
  @ApiResponse({ status: 200, description: 'Return all Partys' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async findAll(): Promise<IParty[]> {
    return this.partyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Party by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the Party to retrieve',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Return an Party by its ID.' })
  async findOne(@Param('id') id: string): Promise<IParty | null> {
    return this.partyService.findOne(id);
  }

  @Post('')
  @ApiOperation({ summary: 'Creates a new Party' })
  @ApiBody({ type: CreatePartyDto })
  @ApiResponse({ status: 201, description: 'Creates new Party' })
  async create(@Body() party: CreatePartyDto): Promise<IParty> {
    return this.partyService.create(party);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes an Party by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the Party to delete',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Deletes an Party by ID.' })
  delete(@Param('id') id: string): void {
    console.log('Party DELETION Party.CONTROLLER');
    this.partyService.delete(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an party by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the Party to update',
    type: 'string',
  })
  @ApiBody({ type: UpdatePartyDto })
  @ApiResponse({ status: 200, description: 'Updates an Party by ID.' })
  async update(
    @Param('id') id: string,
    @Body() party: UpdatePartyDto
  ): Promise<IParty | null> {
    return this.partyService.update(id, party);
  }
}
