# Birds NestJS CRUD Sample

NestJS CRUD API with URI versioning, JWT authentication, Swagger, Scalar, and in-memory bird data. The project requires Node.js 22 or newer.

## Setup

```bash
npm install
npm run start:dev
```

The local API runs at `http://localhost:3001`.

## API documentation

- Swagger UI: `http://localhost:3001/`
- Scalar API Reference: `http://localhost:3001/scalar`

Both interfaces use the same generated OpenAPI document.

## Endpoints

| Method              | Path                | Authentication | Description                                |
| ------------------- | ------------------- | -------------- | ------------------------------------------ |
| POST                | `/api/auth/login`   | No             | Get a JWT access token                     |
| GET                 | `/api/v1/birds`     | No             | List birds                                 |
| GET                 | `/api/v1/birds/:id` | No             | Get a bird                                 |
| POST                | `/api/v1/birds`     | No             | Create a bird                              |
| PUT                 | `/api/v1/birds/:id` | No             | Replace a bird                             |
| PATCH               | `/api/v1/birds/:id` | No             | Partially update a bird                    |
| DELETE              | `/api/v1/birds/:id` | No             | Delete a bird                              |
| Any `/birds` method | `/api/v2/birds...`  | Bearer JWT     | Authenticated version of the same CRUD API |

The sample login credentials are `bpi` / `bpi2023`.

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"bpi","password":"bpi2023"}'
```

## Bird contract

Create and PUT requests require every mutable field:

```json
{
  "birdMyanmarName": "ငှက်စိမ်းရင်ဝါ",
  "birdEnglishName": "Orange-bellied Leafbird",
  "description": "A beautiful green bird with a yellow belly.",
  "imagePath": "/birds/img/1_Orange-belliedLeafbird.jpg"
}
```

Responses add a numeric `id`. PATCH accepts any non-empty subset of the mutable fields. Unknown fields, missing required fields, empty strings, empty PATCH bodies, and non-canonical image paths return `400 Bad Request`.

`imagePath` always uses `/birds/img/file.ext` in requests, responses, and seed storage. Files under `public/birds/img/` are available from the same path in local development and through Vercel's static-file CDN.

This camelCase contract replaces the earlier PascalCase contract in both v1 and v2.

## Tests

```bash
npm run build
npm test
npm run test:e2e
```

## Vercel deployment

Vercel detects `src/main.ts` as a NestJS entry point, so no custom handler or catch-all rewrite is required. Files in `public/` are served by Vercel's static-file CDN.

Bird mutations are stored only in the running process. They can reset on a Vercel cold start or deployment and can differ between concurrent instances. Use an external database before treating this sample as a persistent production CRUD service.
