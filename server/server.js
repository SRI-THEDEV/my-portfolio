import app from './app.js';
import { isSupabaseConfigured } from './supabase.js';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`[Server] Portfolio API running on http://localhost:${PORT}`);
  if (isSupabaseConfigured()) {
    console.log('[Database] Connected to Supabase client.');
  } else {
    console.log('[Database] Supabase URL/Key not set in .env — using memory & seed fallback.');
  }
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n[Server Error] Port ${PORT} is already in use.`);
    console.error(`Kill the occupying process with: Stop-Process -Id (Get-NetTCPConnection -LocalPort ${PORT}).OwningProcess -Force\n`);
  } else {
    console.error('[Server Error]', err);
  }
});

const shutdown = () => {
  server.close(() => {
    process.exit(0);
  });
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default app;
