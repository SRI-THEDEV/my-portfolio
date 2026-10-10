import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProfile)
  .put(requireAdmin, updateProfile);

export default router;
