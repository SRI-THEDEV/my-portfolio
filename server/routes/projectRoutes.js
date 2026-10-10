import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProjects) // Public for visitors
  .post(requireAdmin, createProject); // Admin only

router.route('/:id')
  .get(getProjectById) // Public for visitors
  .put(requireAdmin, updateProject) // Admin only
  .delete(requireAdmin, deleteProject); // Admin only

export default router;
