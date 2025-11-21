import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBirdDto {
  @ApiPropertyOptional({
    description: 'Bird name in Myanmar language',
    example: 'ငှက်စိမ်းရင်ဝါ',
  })
  BirdMyanmarName?: string;

  @ApiPropertyOptional({
    description: 'Bird name in English',
    example: 'Orange-bellied Leafbird',
  })
  BirdEnglishName?: string;

  @ApiPropertyOptional({
    description: 'Bird description',
    example: 'A beautiful green bird with yellow belly...',
  })
  Description?: string;

  @ApiPropertyOptional({
    description: 'Path to bird image (relative to public/birds/)',
    example: 'img/1_Orange-belliedLeafbird.jpg',
  })
  ImagePath?: string;
}

