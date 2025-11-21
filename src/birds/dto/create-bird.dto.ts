import { ApiProperty } from '@nestjs/swagger';

export class CreateBirdDto {
  @ApiProperty({
    description: 'Bird name in Myanmar language',
    example: 'ငှက်စိမ်းရင်ဝါ',
  })
  BirdMyanmarName: string;

  @ApiProperty({
    description: 'Bird name in English',
    example: 'Orange-bellied Leafbird',
  })
  BirdEnglishName: string;

  @ApiProperty({
    description: 'Bird description',
    example: 'A beautiful green bird with yellow belly...',
  })
  Description: string;

  @ApiProperty({
    description: 'Path to bird image (relative to public/birds/)',
    example: 'img/1_Orange-belliedLeafbird.jpg',
  })
  ImagePath: string;
}

