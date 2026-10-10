import { supabase, isSupabaseConfigured, formatRecord, formatRecords } from '../supabase.js';
import { initialProjects } from '../seed/seedData.js';

// In-memory store fallback when Supabase credentials are not yet configured
let memoryProjects = [...initialProjects].map((p, idx) => ({
  ...p,
  id: `local-proj-${idx + 1}`,
  _id: `local-proj-${idx + 1}`
}));

export const getProjects = async (req, res) => {
  try {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        return res.status(200).json({
          success: true,
          count: data.length,
          data: formatRecords(data)
        });
      }
    }

    // Fallback to in-memory/seed data
    res.status(200).json({
      success: true,
      count: memoryProjects.length,
      data: formatRecords(memoryProjects)
    });
  } catch (error) {
    console.error('[Supabase getProjects error]', error.message);
    res.status(200).json({
      success: true,
      count: memoryProjects.length,
      data: formatRecords(memoryProjects)
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        return res.status(200).json({ success: true, data: formatRecord(data) });
      }
    }

    const localProject = memoryProjects.find(p => p.id === id || p._id === id);
    if (!localProject) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, data: formatRecord(localProject) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      tags: Array.isArray(req.body.tags)
        ? req.body.tags
        : typeof req.body.tags === 'string'
        ? req.body.tags.split(',').map(t => t.trim()).filter(Boolean)
        : []
    };

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('projects')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json({ success: true, data: formatRecord(data) });
    }

    // Local fallback
    const newLocal = {
      ...payload,
      id: `local-proj-${Date.now()}`,
      _id: `local-proj-${Date.now()}`
    };
    memoryProjects.unshift(newLocal);
    res.status(201).json({ success: true, data: formatRecord(newLocal) });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('projects')
        .update(req.body)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json({ success: true, data: formatRecord(data) });
    }

    const idx = memoryProjects.findIndex(p => p.id === id || p._id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    memoryProjects[idx] = { ...memoryProjects[idx], ...req.body };
    res.status(200).json({ success: true, data: formatRecord(memoryProjects[idx]) });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return res.status(200).json({ success: true, message: 'Project deleted successfully' });
    }

    memoryProjects = memoryProjects.filter(p => p.id !== id && p._id !== id);
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
