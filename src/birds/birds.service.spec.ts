import { BadRequestException } from '@nestjs/common';
import { BirdsService } from './birds.service';

describe('BirdsService', () => {
  it('rejects string PATCH bodies before spreading them into numeric keys', () => {
    const service = new BirdsService();

    expect(() =>
      service.update(1, '{"birdEnglishName":"Patched"}' as never),
    ).toThrow(BadRequestException);
  });
});
