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
        const formatted = formatRecord(data);
        if (!formatted.resumeUrl && formatted.socials?.resumeUrl) {
          formatted.resumeUrl = formatted.socials.resumeUrl;
        }
        if (!formatted.resumeUrl) {
          formatted.resumeUrl = '/Sri_Nataraj_Y_Resume.pdf';
        }
        return res.status(200).json({ success: true, data: formatted });
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
        .select('id, stats, socials')
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
        let { data, error } = await supabase
          .from('profile')
          .update(updatePayload)
          .eq('id', existing.id)
          .select()
          .single();

        // If Supabase schema cache does not have 'resumeUrl' column yet, fallback to socials jsonb
        if (error && (error.message?.includes('resumeUrl') || error.code === 'PGRST204')) {
          console.warn('[Supabase updateProfile] resumeUrl column missing, falling back to socials.resumeUrl:', error.message);
          const resumeVal = updatePayload.resumeUrl;
          delete updatePayload.resumeUrl;
          updatePayload.socials = {
            ...(existing.socials || {}),
            ...(updatePayload.socials || {}),
            resumeUrl: resumeVal
          };

          const retry = await supabase
            .from('profile')
            .update(updatePayload)
            .eq('id', existing.id)
            .select()
            .single();

          if (retry.error) throw retry.error;
          data = retry.data;
          error = null;
        }

        if (error) throw error;
        result = data;
      } else {
        let { data, error } = await supabase
          .from('profile')
          .insert([updatePayload])
          .select()
          .single();

        if (error && (error.message?.includes('resumeUrl') || error.code === 'PGRST204')) {
          const resumeVal = updatePayload.resumeUrl;
          delete updatePayload.resumeUrl;
          updatePayload.socials = {
            ...(updatePayload.socials || {}),
            resumeUrl: resumeVal
          };

          const retry = await supabase
            .from('profile')
            .insert([updatePayload])
            .select()
            .single();

          if (retry.error) throw retry.error;
          data = retry.data;
          error = null;
        }

        if (error) throw error;
        result = data;
      }

      const formatted = formatRecord(result);
      if (!formatted.resumeUrl && formatted.socials?.resumeUrl) {
        formatted.resumeUrl = formatted.socials.resumeUrl;
      }
      return res.status(200).json({ success: true, data: formatted });
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
