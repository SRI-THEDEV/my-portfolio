import express from 'express';
import {
  createMessage,
  getMessages,
  markAsRead,
  deleteMessage
} from '../controllers/messageController.js';

const router = express.Router();

router.route('/')
  .post(createMessage)
  .get(getMessages);

router.route('/:id/read')
  .patch(markAsRead);

router.route('/:id')
  .delete(deleteMessage);

export default router;
