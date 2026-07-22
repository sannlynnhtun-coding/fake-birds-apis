import request from 'supertest';
import type { OpenAPIObject } from '@nestjs/swagger';
import handler, { createApp } from './../src/main';
import type { LoginResponseDto } from './../src/auth/auth.controller';
import type { BirdResponseDto } from './../src/birds/dto/bird-response.dto';

const birdPayload = {
  birdMyanmarName: 'ငှက်စိမ်းရင်ဝါ',
  birdEnglishName: 'Orange-bellied Leafbird',
  description: 'A beautiful green bird with a yellow belly.',
  imagePath: '/birds/img/1_Orange-belliedLeafbird.jpg',
};

describe('Birds API (e2e)', () => {
  let app: Awaited<ReturnType<typeof createApp>>;

  it('serves requests through the Vercel handler', () =>
    request(handler).get('/api').expect(200));

  beforeAll(async () => {
    app = await createApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('uses the production API prefix', async () => {
    const response = await request(app.getHttpServer()).get('/api').expect(200);

    expect(response.body as { message: string }).toMatchObject({
      message: 'Birds API',
    });
  });

  it('serves Scalar API documentation', () => {
    return request(app.getHttpServer())
      .get('/scalar')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(({ text }) => expect(text).toContain('Scalar API Reference'));
  });

  it('serves the current endpoints to Swagger UI', async () => {
    await request(app.getHttpServer())
      .get('/swagger-ui.css')
      .expect(200)
      .expect('Content-Type', /css/);
    await request(app.getHttpServer())
      .get('/swagger-ui-bundle.js')
      .expect(200)
      .expect('Content-Type', /javascript/);

    const response = await request(app.getHttpServer())
      .get('/swagger-ui-init.js')
      .expect(200);

    expect(response.text).toContain('"/api/v1/birds"');
    expect(response.text).toContain('"/api/v2/birds"');
  });

  it('returns 200 for a successful login', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ username: 'bpi', password: 'bpi2023' })
      .expect(200);

    const body = response.body as LoginResponseDto;
    expect(typeof body.access_token).toBe('string');
    expect(body.access_token.length).toBeGreaterThan(0);
  });

  it('returns camelCase birds with a working canonical image URL', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/birds')
      .expect(200);
    const body = response.body as BirdResponseDto[];

    expect(body[0]).toEqual(
      expect.objectContaining({
        id: 1,
        birdEnglishName: 'Orange-bellied Leafbird',
        imagePath: '/birds/img/1_Orange-belliedLeafbird.jpg',
      }),
    );
    expect(body[0]).not.toHaveProperty('ImagePath');

    await request(app.getHttpServer())
      .get(body[0].imagePath)
      .expect(200)
      .expect('Content-Type', /image\/jpeg/);
  });

  it('rejects missing, unknown, and non-canonical request fields', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/birds')
      .send({})
      .expect(400);

    await request(app.getHttpServer())
      .post('/api/v1/birds')
      .send({ ...birdPayload, unexpected: true })
      .expect(400);

    await request(app.getHttpServer())
      .post('/api/v1/birds')
      .send({ ...birdPayload, imagePath: 'img/bird.jpg' })
      .expect(400);
  });

  it('replaces with PUT and partially updates with PATCH', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/api/v1/birds')
      .send(birdPayload)
      .expect(201);
    const created = createResponse.body as BirdResponseDto;

    await request(app.getHttpServer())
      .put(`/api/v1/birds/${created.id}`)
      .send({ description: 'Incomplete replacement' })
      .expect(400);

    const replacement = {
      ...birdPayload,
      birdEnglishName: 'Replacement Bird',
      description: 'Fully replaced.',
    };
    const replaceResponse = await request(app.getHttpServer())
      .put(`/api/v1/birds/${created.id}`)
      .send(replacement)
      .expect(200);
    const replaced = replaceResponse.body as BirdResponseDto;
    expect(replaced).toEqual({ id: created.id, ...replacement });

    const patchResponse = await request(app.getHttpServer())
      .patch(`/api/v1/birds/${created.id}`)
      .send({ description: 'Partially updated.' })
      .expect(200);
    const patched = patchResponse.body as BirdResponseDto;
    expect(patched).toEqual({
      id: created.id,
      ...replacement,
      description: 'Partially updated.',
    });

    await request(app.getHttpServer())
      .patch(`/api/v1/birds/${created.id}`)
      .send({})
      .expect(400);

    await request(app.getHttpServer())
      .delete(`/api/v1/birds/${created.id}`)
      .expect(200);
  });

  it('publishes typed Bird response schemas in OpenAPI', async () => {
    const response = await request(app.getHttpServer())
      .get('/-json')
      .expect(200);
    const document = response.body as OpenAPIObject;

    expect(document.components?.schemas.BirdResponseDto).toMatchObject({
      required: [
        'id',
        'birdMyanmarName',
        'birdEnglishName',
        'description',
        'imagePath',
      ],
      properties: {
        id: { type: 'number' },
        birdMyanmarName: { type: 'string' },
        birdEnglishName: { type: 'string' },
        description: { type: 'string' },
        imagePath: { type: 'string' },
      },
    });
    expect(
      document.paths['/api/v1/birds']?.get?.responses['200'],
    ).toMatchObject({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: { $ref: '#/components/schemas/BirdResponseDto' },
          },
        },
      },
    });
    const loginResponses = document.paths['/api/auth/login']?.post?.responses;
    expect(loginResponses).toHaveProperty('200');
    expect(loginResponses).not.toHaveProperty('201');
  });

  it('keeps v2 protected by JWT', () => {
    return request(app.getHttpServer()).get('/api/v2/birds').expect(401);
  });
});
