import { PartialType } from '@nestjs/swagger';
import { CreateBirdDto } from './create-bird.dto';

export class UpdateBirdDto extends PartialType(CreateBirdDto) {}
