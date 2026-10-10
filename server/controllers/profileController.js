import { supabase, isSupabaseConfigured, formatRecord } from '../supabase.js';
import { initialProfile } from '../seed/seedData.js';

let memoryProfile = {
  ...initialProfile,
  id: 'local-profile-1',
  _id: 'local-profile-1'
};

export const getProfile = async (req, res) => {
  try {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        return res.status(200).json({ success: true, data: formatRecord(data) });
      }
    }

    res.status(200).json({ success: true, data: formatRecord(memoryProfile) });
  } catch (error) {
    console.error('[Supabase getProfile error]', error.message);
    res.status(200).json({ success: true, data: formatRecord(memoryProfile) });
  }
};

export const updateProfile = async (req, res) => {
  try {
    if (isSupabaseConfigured() && supabase) {
      const { data: existing } = await supabase
        .from('profile')
        .select('id, stats')
        .limit(1)
        .maybeSingle();

      let updatePayload = { ...req.body };
      if (req.body.stats && existing?.stats) {
        updatePayload.stats = {
          ...existing.stats,
          ...req.body.stats
        };
      }

      let result;
      if (existing) {
        const { data, error } = await supabase
          .from('profile')
          .update(updatePayload)
          .eq('id', existing.id)
          .select()
          .single();
        if (error) throw error;
        result = data;
      } else {
        const { data, error } = await supabase
          .from('profile')
          .insert([updatePayload])
          .select()
          .single();
        if (error) throw error;
        result = data;
      }

      return res.status(200).json({ success: true, data: formatRecord(result) });
    }

    // Local fallback
    if (req.body.stats) {
      memoryProfile.stats = {
        ...memoryProfile.stats,
        ...req.body.stats
      };
      delete req.body.stats;
    }
    Object.assign(memoryProfile, req.body);

    res.status(200).json({ success: true, data: formatRecord(memoryProfile) });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
