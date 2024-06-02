import express from 'express';
import { uploadFile, listFiles, deleteFile, getFile, downloadFile, updateFile } from '../controllers/index.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/list', listFiles);
router.delete('/delete/:id', deleteFile);
router.get('/:id', getFile);
router.get('/download/:id', downloadFile);
router.put('/update/:id', upload.single('file'), updateFile);

export default router;
