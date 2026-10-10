import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('placeholder')
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false }
    })
  : null;

// Normalizes Supabase record to match frontend expectations (_id field)
export const formatRecord = (item) => {
  if (!item) return item;
  return {
    ...item,
    _id: item.id || item._id,
    isRead: item.is_read !== undefined ? item.is_read : item.isRead,
    createdAt: item.created_at || item.createdAt
  };
};

export const formatRecords = (items) => {
  if (!Array.isArray(items)) return [];
  return items.map(formatRecord);
};
