import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBirdDto } from './dto/create-bird.dto';
import { UpdateBirdDto } from './dto/update-bird.dto';
import { BirdResponseDto } from './dto/bird-response.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BirdsService {
  private birds: BirdResponseDto[] = [];
  private nextId = 1;

  constructor() {
    const jsonPath = path.join(process.cwd(), 'public', 'birds', 'birds.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    this.birds = JSON.parse(jsonData) as BirdResponseDto[];

    if (this.birds.length > 0) {
      this.nextId = Math.max(...this.birds.map((bird) => bird.id)) + 1;
    }
  }

  findAll(): BirdResponseDto[] {
    return this.birds;
  }

  findOne(id: number): BirdResponseDto {
    const bird = this.birds.find((candidate) => candidate.id === id);
    if (!bird) {
      throw new NotFoundException(`Bird with ID ${id} not found`);
    }
    return bird;
  }

  create(createBirdDto: CreateBirdDto): BirdResponseDto {
    const newBird: BirdResponseDto = {
      id: this.nextId++,
      ...createBirdDto,
    };
    this.birds.push(newBird);
    return newBird;
  }

  replace(id: number, createBirdDto: CreateBirdDto): BirdResponseDto {
    const birdIndex = this.birds.findIndex((bird) => bird.id === id);
    if (birdIndex === -1) {
      throw new NotFoundException(`Bird with ID ${id} not found`);
    }

    this.birds[birdIndex] = { id, ...createBirdDto };
    return this.birds[birdIndex];
  }

  update(id: number, updateBirdDto: UpdateBirdDto): BirdResponseDto {
    if (
      typeof updateBirdDto !== 'object' ||
      updateBirdDto === null ||
      Array.isArray(updateBirdDto)
    ) {
      throw new BadRequestException('Request body must be a JSON object');
    }

    if (Object.keys(updateBirdDto).length === 0) {
      throw new BadRequestException('At least one field is required');
    }

    const birdIndex = this.birds.findIndex((bird) => bird.id === id);
    if (birdIndex === -1) {
      throw new NotFoundException(`Bird with ID ${id} not found`);
    }

    this.birds[birdIndex] = {
      ...this.birds[birdIndex],
      ...updateBirdDto,
    };
    return this.birds[birdIndex];
  }

  remove(id: number): void {
    const birdIndex = this.birds.findIndex((bird) => bird.id === id);
    if (birdIndex === -1) {
      throw new NotFoundException(`Bird with ID ${id} not found`);
    }
    this.birds.splice(birdIndex, 1);
  }
}
