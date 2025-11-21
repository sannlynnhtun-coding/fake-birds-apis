import { Bird } from './interfaces/bird.interface';
import { CreateBirdDto } from './dto/create-bird.dto';
import { UpdateBirdDto } from './dto/update-bird.dto';
export declare class BirdsService {
    private birds;
    private nextId;
    constructor();
    private transformBird;
    findAll(): Bird[];
    findOne(id: number): Bird;
    create(createBirdDto: CreateBirdDto): Bird;
    update(id: number, updateBirdDto: UpdateBirdDto): Bird;
    remove(id: number): void;
}
