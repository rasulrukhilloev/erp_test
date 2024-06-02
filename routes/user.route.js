import express from 'express';
import { getUserInfo } from '../controllers/index.js';

const router = express.Router();

router.get('/info', getUserInfo);

export default router;
