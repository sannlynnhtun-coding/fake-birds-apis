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
} from '@nestjs/swagger';
import { BirdsService } from './birds.service';
import { CreateBirdDto } from './dto/create-bird.dto';
import { UpdateBirdDto } from './dto/update-bird.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('birds-v2')
@ApiBearerAuth('JWT-auth')
@Controller({ path: 'birds', version: '2' })
@UseGuards(JwtAuthGuard)
export class BirdsV2Controller {
  constructor(private readonly birdsService: BirdsService) {}

  @Get()
  @Version('2')
  @ApiOperation({ summary: 'Get all birds (v2 - Auth Required)' })
  @ApiResponse({ status: 200, description: 'List of all birds' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.birdsService.findAll();
  }

  @Get(':id')
  @Version('2')
  @ApiOperation({ summary: 'Get a specific bird by ID (v2 - Auth Required)' })
  @ApiParam({ name: 'id', type: 'number', description: 'Bird ID' })
  @ApiResponse({ status: 200, description: 'Bird details' })
  @ApiResponse({ status: 404, description: 'Bird not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.birdsService.findOne(id);
  }

  @Post()
  @Version('2')
  @ApiOperation({ summary: 'Create a new bird (v2 - Auth Required)' })
  @ApiResponse({ status: 201, description: 'Bird created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createBirdDto: CreateBirdDto) {
    return this.birdsService.create(createBirdDto);
  }

  @Put(':id')
  @Version('2')
  @ApiOperation({ summary: 'Update a bird (full update) (v2 - Auth Required)' })
  @ApiParam({ name: 'id', type: 'number', description: 'Bird ID' })
  @ApiResponse({ status: 200, description: 'Bird updated successfully' })
  @ApiResponse({ status: 404, description: 'Bird not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBirdDto: UpdateBirdDto,
  ) {
    return this.birdsService.update(id, updateBirdDto);
  }

  @Patch(':id')
  @Version('2')
  @ApiOperation({ summary: 'Update a bird (partial update) (v2 - Auth Required)' })
  @ApiParam({ name: 'id', type: 'number', description: 'Bird ID' })
  @ApiResponse({ status: 200, description: 'Bird updated successfully' })
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

