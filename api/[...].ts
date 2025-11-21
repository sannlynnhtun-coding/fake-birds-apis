import { createApp } from '../src/main';
import type { VercelRequest, VercelResponse } from '@vercel/node';

let app: any;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (!app) {
    app = await createApp();
  }
  const expressApp = app.getHttpAdapter().getInstance();
  return expressApp(req, res);
}

