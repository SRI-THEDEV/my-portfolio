import app, { connectDB } from './app.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;

const startServer = () => {
  const server = app.listen(PORT, () => {
    console.log(`[Server] Creative Developer Portfolio API running on http://localhost:${PORT}`);
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
      mongoose.connection.close(false);
      process.exit(0);
    });
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
  return server;
};

connectDB()
  .then(() => startServer())
  .catch(() => {
    console.log(`[Server] Starting on port ${PORT} without active MongoDB connection...`);
    startServer();
  });
