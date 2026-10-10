import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import projectRoutes from './routes/projectRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { seedDatabase } from './seed/seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eportfolio_db';

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api', serviceRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting/disconnected',
    timestamp: new Date().toISOString()
  });
});

// Root welcome endpoint
app.get('/', (req, res) => {
  res.send('Creative Developer Portfolio API is running...');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Route Not Found' });
});

// Connect to MongoDB & Start Server
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

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log(`[MongoDB] Connected successfully to database: ${MONGO_URI}`);
    await seedDatabase();
    startServer();
  })
  .catch((err) => {
    console.error('[MongoDB] Connection error:', err.message);
    // Still start server so API can return clear errors or fallback
    console.log(`[Server] Running on port ${PORT} (MongoDB offline, check service)`);
    startServer();
  });
