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

// Middleware
const allowedOrigin = process.env.CLIENT_URL;
app.use(cors(allowedOrigin ? { origin: allowedOrigin, credentials: true } : {}));
app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
const handleHealth = (req, res) => {
  res.status(200).json({
    status: 'online',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting/disconnected',
    timestamp: new Date().toISOString()
  });
};
app.get('/api/health', handleHealth);
app.get('/health', handleHealth);

// Routes (supports both /api prefix and direct routes)
app.use('/api/projects', projectRoutes);
app.use('/projects', projectRoutes);

app.use('/api/messages', messageRoutes);
app.use('/messages', messageRoutes);

app.use('/api/profile', profileRoutes);
app.use('/profile', profileRoutes);

app.use('/api/admin', adminRoutes);
app.use('/admin', adminRoutes);

app.use('/api', serviceRoutes);
app.use('/', serviceRoutes);

// Root welcome endpoint
app.get('/', (req, res) => {
  res.send('Creative Developer Portfolio API is running...');
});

// Cache database connection for serverless & local
let isConnected = false;
let seedingPromise = null;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eportfolio_db';
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`[MongoDB] Connected successfully to ${MONGO_URI.includes('@') ? 'remote cluster' : 'local database'}`);
    
    if (!seedingPromise) {
      seedingPromise = seedDatabase().catch(err => console.error('[Seed Error]', err));
    }
    await seedingPromise;
  } catch (err) {
    console.error('[MongoDB] Connection error:', err.message);
  }
};

export default app;
