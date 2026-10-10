import express from 'express';
import {
  createMessage,
  getMessages,
  markAsRead,
  deleteMessage
} from '../controllers/messageController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createMessage) // Public for visitors sending contact inquiries
  .get(requireAdmin, getMessages); // Admin only

router.route('/:id/read')
  .patch(requireAdmin, markAsRead);

router.route('/:id')
  .delete(requireAdmin, deleteMessage);

export default router;
