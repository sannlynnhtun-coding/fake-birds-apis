import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Version,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { BirdsService } from './birds.service';
import { CreateBirdDto } from './dto/create-bird.dto';
import { UpdateBirdDto } from './dto/update-bird.dto';
import { BirdResponseDto } from './dto/bird-response.dto';

@ApiTags('birds-v1')
@Controller({ path: 'birds', version: '1' })
export class BirdsV1Controller {
  constructor(private readonly birdsService: BirdsService) {}

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get all birds (v1 - No Auth Required)' })
  @ApiOkResponse({
    description: 'List of all birds',
    type: BirdResponseDto,
    isArray: true,
  })
  findAll() {
    return this.birdsService.findAll();
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({
    summary: 'Get a specific bird by ID (v1 - No Auth Required)',
  })
  @ApiParam({ name: 'id', type: 'number', description: 'Bird ID' })
  @ApiOkResponse({ description: 'Bird details', type: BirdResponseDto })
  @ApiResponse({ status: 404, description: 'Bird not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.birdsService.findOne(id);
  }

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create a new bird (v1 - No Auth Required)' })
  @ApiCreatedResponse({
    description: 'Bird created successfully',
    type: BirdResponseDto,
  })
  create(@Body() createBirdDto: CreateBirdDto) {
    return this.birdsService.create(createBirdDto);
  }

  @Put(':id')
  @Version('1')
  @ApiOperation({
    summary: 'Update a bird (full update) (v1 - No Auth Required)',
  })
  @ApiParam({ name: 'id', type: 'number', description: 'Bird ID' })
  @ApiOkResponse({
    description: 'Bird replaced successfully',
    type: BirdResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Bird not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createBirdDto: CreateBirdDto,
  ) {
    return this.birdsService.replace(id, createBirdDto);
  }

  @Patch(':id')
  @Version('1')
  @ApiOperation({
    summary: 'Update a bird (partial update) (v1 - No Auth Required)',
  })
  @ApiParam({ name: 'id', type: 'number', description: 'Bird ID' })
  @ApiOkResponse({
    description: 'Bird updated successfully',
    type: BirdResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Bird not found' })
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBirdDto: UpdateBirdDto,
  ) {
    return this.birdsService.update(id, updateBirdDto);
  }

  @Delete(':id')
  @Version('1')
  @ApiOperation({ summary: 'Delete a bird (v1 - No Auth Required)' })
  @ApiParam({ name: 'id', type: 'number', description: 'Bird ID' })
  @ApiResponse({ status: 200, description: 'Bird deleted successfully' })
  @ApiResponse({ status: 404, description: 'Bird not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    this.birdsService.remove(id);
    return { message: 'Bird deleted successfully' };
  }
}
