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
import { BirdsService } from './birds.service';
import { CreateBirdDto } from './dto/create-bird.dto';
import { UpdateBirdDto } from './dto/update-bird.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('birds')
@UseGuards(JwtAuthGuard)
export class BirdsController {
  constructor(private readonly birdsService: BirdsService) {}

  @Get()
  findAll() {
    return this.birdsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.birdsService.findOne(id);
  }

  @Post()
  create(@Body() createBirdDto: CreateBirdDto) {
    return this.birdsService.create(createBirdDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBirdDto: UpdateBirdDto,
  ) {
    return this.birdsService.update(id, updateBirdDto);
  }

  @Patch(':id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBirdDto: UpdateBirdDto,
  ) {
    return this.birdsService.update(id, updateBirdDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.birdsService.remove(id);
    return { message: 'Bird deleted successfully' };
  }
}

