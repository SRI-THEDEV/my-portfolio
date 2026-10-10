import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import projectRoutes from './routes/projectRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { isSupabaseConfigured, supabase } from './supabase.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || true, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
const handleHealth = async (req, res) => {
  const configured = isSupabaseConfigured();
  let dbStatus = 'disconnected';
  if (configured && supabase) {
    try {
      const { error } = await supabase.from('projects').select('id').limit(1);
      dbStatus = error ? 'connecting/fallback' : 'connected';
    } catch {
      dbStatus = 'connecting/fallback';
    }
  }

  res.status(200).json({
    status: 'online',
    database: dbStatus,
    provider: 'Supabase',
    configured,
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
  res.send('Creative Developer Portfolio API is running (Supabase Backend)...');
});

export default app;
