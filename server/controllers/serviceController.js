import Service from '../models/Service.js';
import Toolkit from '../models/Toolkit.js';
import Process from '../models/Process.js';

export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getToolkit = async (req, res) => {
  try {
    const toolkit = await Toolkit.find().sort({ order: 1 });
    res.status(200).json({ success: true, count: toolkit.length, data: toolkit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProcesses = async (req, res) => {
  try {
    const processes = await Process.find().sort({ order: 1 });
    res.status(200).json({ success: true, count: processes.length, data: processes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
