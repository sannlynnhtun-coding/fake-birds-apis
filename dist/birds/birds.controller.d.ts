import { BirdsService } from './birds.service';
import { CreateBirdDto } from './dto/create-bird.dto';
import { UpdateBirdDto } from './dto/update-bird.dto';
export declare class BirdsController {
    private readonly birdsService;
    constructor(birdsService: BirdsService);
    findAll(): import("./interfaces/bird.interface").Bird[];
    findOne(id: number): import("./interfaces/bird.interface").Bird;
    create(createBirdDto: CreateBirdDto): import("./interfaces/bird.interface").Bird;
    update(id: number, updateBirdDto: UpdateBirdDto): import("./interfaces/bird.interface").Bird;
    patch(id: number, updateBirdDto: UpdateBirdDto): import("./interfaces/bird.interface").Bird;
    remove(id: number): {
        message: string;
    };
}
