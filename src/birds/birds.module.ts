import { Module } from '@nestjs/common';
import { BirdsV1Controller } from './birds-v1.controller';
import { BirdsV2Controller } from './birds-v2.controller';
import { BirdsService } from './birds.service';

@Module({
  controllers: [BirdsV1Controller, BirdsV2Controller],
  providers: [BirdsService],
})
export class BirdsModule {}

