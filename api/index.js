import app, { connectDB } from '../server/app.js';

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.error('[Vercel API] MongoDB connection error:', error.message);
  }
  return app(req, res);
}
