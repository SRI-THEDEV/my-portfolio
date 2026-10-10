import Profile from '../models/Profile.js';
import { initialProfile } from '../seed/seedData.js';

export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(initialProfile);
    }
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      if (req.body.stats) {
        profile.stats = {
          ...profile.stats.toObject(),
          ...req.body.stats
        };
        delete req.body.stats;
      }
      Object.assign(profile, req.body);
      await profile.save();
    }
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
