import { supabase, isSupabaseConfigured, formatRecords } from '../supabase.js';
import { initialServices, initialToolkit, initialProcesses } from '../seed/seedData.js';

let memoryServices = [...initialServices].map((s, idx) => ({ ...s, id: `local-serv-${idx + 1}`, _id: `local-serv-${idx + 1}` }));
let memoryToolkit = [...initialToolkit].map((t, idx) => ({ ...t, id: `local-tool-${idx + 1}`, _id: `local-tool-${idx + 1}` }));
let memoryProcesses = [...initialProcesses].map((p, idx) => ({ ...p, id: `local-proc-${idx + 1}`, _id: `local-proc-${idx + 1}` }));

export const getServices = async (req, res) => {
  try {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;
      if (data && data.length > 0) {
        return res.status(200).json({ success: true, count: data.length, data: formatRecords(data) });
      }
    }
    res.status(200).json({ success: true, count: memoryServices.length, data: formatRecords(memoryServices) });
  } catch (error) {
    console.error('[Supabase getServices error]', error.message);
    res.status(200).json({ success: true, count: memoryServices.length, data: formatRecords(memoryServices) });
  }
};

export const getToolkit = async (req, res) => {
  try {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('toolkit')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;
      if (data && data.length > 0) {
        return res.status(200).json({ success: true, count: data.length, data: formatRecords(data) });
      }
    }
    res.status(200).json({ success: true, count: memoryToolkit.length, data: formatRecords(memoryToolkit) });
  } catch (error) {
    console.error('[Supabase getToolkit error]', error.message);
    res.status(200).json({ success: true, count: memoryToolkit.length, data: formatRecords(memoryToolkit) });
  }
};

export const getProcesses = async (req, res) => {
  try {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('processes')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;
      if (data && data.length > 0) {
        return res.status(200).json({ success: true, count: data.length, data: formatRecords(data) });
      }
    }
    res.status(200).json({ success: true, count: memoryProcesses.length, data: formatRecords(memoryProcesses) });
  } catch (error) {
    console.error('[Supabase getProcesses error]', error.message);
    res.status(200).json({ success: true, count: memoryProcesses.length, data: formatRecords(memoryProcesses) });
  }
};
