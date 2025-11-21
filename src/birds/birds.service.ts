import { Injectable, NotFoundException } from '@nestjs/common';
import { Bird } from './interfaces/bird.interface';
import { CreateBirdDto } from './dto/create-bird.dto';
import { UpdateBirdDto } from './dto/update-bird.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BirdsService {
  private birds: Bird[] = [];
  private nextId = 1;

  constructor() {
    // Initialize with data from JSON file
    const jsonPath = path.join(process.cwd(), 'public', 'birds', 'birds.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    this.birds = JSON.parse(jsonData) as Bird[];
    // Find the highest ID to set nextId
    if (this.birds.length > 0) {
      this.nextId = Math.max(...this.birds.map((b) => b.Id)) + 1;
    }
  }

  private transformBird(bird: Bird): Bird {
    return {
      ...bird,
      ImagePath: `/public/birds/${bird.ImagePath}`,
    };
  }

  findAll(): Bird[] {
    return this.birds.map((bird) => this.transformBird(bird));
  }

  findOne(id: number): Bird {
    const bird = this.birds.find((b) => b.Id === id);
    if (!bird) {
      throw new NotFoundException(`Bird with ID ${id} not found`);
    }
    return this.transformBird(bird);
  }

  create(createBirdDto: CreateBirdDto): Bird {
    const newBird: Bird = {
      Id: this.nextId++,
      ...createBirdDto,
    };
    this.birds.push(newBird);
    return this.transformBird(newBird);
  }

  update(id: number, updateBirdDto: UpdateBirdDto): Bird {
    const birdIndex = this.birds.findIndex((b) => b.Id === id);
    if (birdIndex === -1) {
      throw new NotFoundException(`Bird with ID ${id} not found`);
    }
    this.birds[birdIndex] = {
      ...this.birds[birdIndex],
      ...updateBirdDto,
    };
    return this.transformBird(this.birds[birdIndex]);
  }

  remove(id: number): void {
    const birdIndex = this.birds.findIndex((b) => b.Id === id);
    if (birdIndex === -1) {
      throw new NotFoundException(`Bird with ID ${id} not found`);
    }
    this.birds.splice(birdIndex, 1);
  }
}

