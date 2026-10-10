import { supabase, isSupabaseConfigured, formatRecord, formatRecords } from '../supabase.js';

let memoryMessages = [];

export const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    const payload = {
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      is_read: false
    };

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('messages')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been saved successfully.',
        data: formatRecord(data)
      });
    }

    // In-memory fallback
    const localMsg = {
      ...payload,
      id: `local-msg-${Date.now()}`,
      _id: `local-msg-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    memoryMessages.unshift(localMsg);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been saved successfully.',
      data: formatRecord(localMsg)
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.status(200).json({
        success: true,
        count: data ? data.length : 0,
        data: formatRecords(data || [])
      });
    }

    res.status(200).json({
      success: true,
      count: memoryMessages.length,
      data: formatRecords(memoryMessages)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json({ success: true, data: formatRecord(data) });
    }

    const msg = memoryMessages.find(m => m.id === id || m._id === id);
    if (!msg) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    msg.is_read = true;
    res.status(200).json({ success: true, data: formatRecord(msg) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return res.status(200).json({ success: true, message: 'Message removed' });
    }

    memoryMessages = memoryMessages.filter(m => m.id !== id && m._id !== id);
    res.status(200).json({ success: true, message: 'Message removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
