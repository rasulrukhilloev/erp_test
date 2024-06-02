import express from 'express';
import { signin, signup, refreshToken, logout } from '../controllers/index.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/signin/new_token', refreshToken);
router.post('/logout', logout);

export default router;
