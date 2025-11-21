import { createApp } from '../src/main';
import type { VercelRequest, VercelResponse } from '@vercel/node';

let app: any;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  try {
    if (!app) {
      app = await createApp();
    }
    const expressApp = app.getHttpAdapter().getInstance();
    return expressApp(req, res);
  } catch (error) {
    console.error('Error in Vercel handler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

