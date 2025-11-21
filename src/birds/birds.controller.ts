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

@ApiTags('birds')
@ApiBearerAuth('JWT-auth')
@Controller('birds')
@UseGuards(JwtAuthGuard)
export class BirdsController {
  constructor(private readonly birdsService: BirdsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all birds' })
  @ApiResponse({ status: 200, description: 'List of all birds' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.birdsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a bird by ID' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiResponse({ status: 200, description: 'Bird found' })
  @ApiResponse({ status: 404, description: 'Bird not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.birdsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new bird' })
  @ApiResponse({ status: 201, description: 'Bird created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createBirdDto: CreateBirdDto) {
    return this.birdsService.create(createBirdDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a bird (full update)' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
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
  @ApiOperation({ summary: 'Update a bird (partial update)' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
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
  @ApiOperation({ summary: 'Delete a bird' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiResponse({ status: 200, description: 'Bird deleted successfully' })
  @ApiResponse({ status: 404, description: 'Bird not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('id', ParseIntPipe) id: number) {
    this.birdsService.remove(id);
    return { message: 'Bird deleted successfully' };
  }
}

