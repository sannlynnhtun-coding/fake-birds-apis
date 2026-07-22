import { ApiProperty } from '@nestjs/swagger';

export class BirdResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({
    description: 'Bird name in Myanmar language',
    example: 'ငှက်စိမ်းရင်ဝါ',
  })
  birdMyanmarName!: string;

  @ApiProperty({
    description: 'Bird name in English',
    example: 'Orange-bellied Leafbird',
  })
  birdEnglishName!: string;

  @ApiProperty({
    description: 'Bird description',
    example: 'A beautiful green bird with a yellow belly.',
  })
  description!: string;

  @ApiProperty({
    description: 'Public URL of the bird image',
    example: '/birds/img/1_Orange-belliedLeafbird.jpg',
  })
  imagePath!: string;
}
