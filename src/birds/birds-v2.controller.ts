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
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { BirdsService } from './birds.service';
import { CreateBirdDto } from './dto/create-bird.dto';
import { UpdateBirdDto } from './dto/update-bird.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BirdResponseDto } from './dto/bird-response.dto';

@ApiTags('birds-v2')
@ApiBearerAuth('JWT-auth')
@Controller({ path: 'birds', version: '2' })
@UseGuards(JwtAuthGuard)
export class BirdsV2Controller {
  constructor(private readonly birdsService: BirdsService) {}

  @Get()
  @Version('2')
  @ApiOperation({ summary: 'Get all birds (v2 - Auth Required)' })
  @ApiOkResponse({
    description: 'List of all birds',
    type: BirdResponseDto,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.birdsService.findAll();
  }

  @Get(':id')
  @Version('2')
  @ApiOperation({ summary: 'Get a specific bird by ID (v2 - Auth Required)' })
  @ApiParam({ name: 'id', type: 'number', description: 'Bird ID' })
  @ApiOkResponse({ description: 'Bird details', type: BirdResponseDto })
  @ApiResponse({ status: 404, description: 'Bird not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.birdsService.findOne(id);
  }

  @Post()
  @Version('2')
  @ApiOperation({ summary: 'Create a new bird (v2 - Auth Required)' })
  @ApiCreatedResponse({
    description: 'Bird created successfully',
    type: BirdResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createBirdDto: CreateBirdDto) {
    return this.birdsService.create(createBirdDto);
  }

  @Put(':id')
  @Version('2')
  @ApiOperation({ summary: 'Update a bird (full update) (v2 - Auth Required)' })
  @ApiParam({ name: 'id', type: 'number', description: 'Bird ID' })
  @ApiOkResponse({
    description: 'Bird replaced successfully',
    type: BirdResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Bird not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createBirdDto: CreateBirdDto,
  ) {
    return this.birdsService.replace(id, createBirdDto);
  }

  @Patch(':id')
  @Version('2')
  @ApiOperation({
    summary: 'Update a bird (partial update) (v2 - Auth Required)',
  })
  @ApiParam({ name: 'id', type: 'number', description: 'Bird ID' })
  @ApiOkResponse({
    description: 'Bird updated successfully',
    type: BirdResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Bird not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBirdDto: UpdateBirdDto,
  ) {
    return this.birdsService.update(id, updateBirdDto);
  }

  @Delete(':id')
  @Version('2')
  @ApiOperation({ summary: 'Delete a bird (v2 - Auth Required)' })
  @ApiParam({ name: 'id', type: 'number', description: 'Bird ID' })
  @ApiResponse({ status: 200, description: 'Bird deleted successfully' })
  @ApiResponse({ status: 404, description: 'Bird not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('id', ParseIntPipe) id: number) {
    this.birdsService.remove(id);
    return { message: 'Bird deleted successfully' };
  }
}
