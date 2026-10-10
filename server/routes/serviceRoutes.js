import express from 'express';
import {
  getServices,
  getToolkit,
  getProcesses
} from '../controllers/serviceController.js';

const router = express.Router();

router.get('/services', getServices);
router.get('/toolkit', getToolkit);
router.get('/processes', getProcesses);

export default router;
