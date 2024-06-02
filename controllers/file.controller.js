import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

import {File} from '../db/models/index.js';

const ensureUploadsFolder = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const dir = path.join(__dirname, '../uploads');
    try {
        await fs.access(dir);
    } catch (error) {
        await fs.mkdir(dir, { recursive: true });
    }
};
export const uploadFile = async (req, res) => {
    const { id } = req.user;
    const { originalname, mimetype, size } = req.file;

    try {
        const fileExtension = path.extname(originalname);
        const fileName = path.basename(originalname, fileExtension);
        const fileId = await File.create(id, fileName, fileExtension, mimetype, size);

        ensureUploadsFolder();

        const filePath = path.join('uploads', `${fileName}_${fileId}${fileExtension}`);
        await fs.writeFile(filePath, req.file.buffer)
        res.status(201).json({ id: fileId, fileName, fileExtension, mimetype, size })


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

export const listFiles = async (req, res) => {
    const listSize = parseInt(req.query.list_size, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = (page - 1) * listSize;

    try {
        const files = await File.findAll(listSize, offset);
        res.json(files);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteFile = async (req, res) => {
    const { id } = req.params;
    try {
        const file = await File.findById(id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        await File.deleteById(id);

        const filePath = path.join('uploads', `${file.file_name}_${file.id}${file.file_extension}`);

        try {
            await fs.access(filePath);
            await fs.unlink(filePath);
        } catch (error) {
            console.error(`File not found: ${filePath}`);
        }

        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFile = async (req, res) => {
    const { id } = req.params;

    try {
        const file = await File.findById(id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.json(file);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const downloadFile = async (req, res) => {
    const { id } = req.params;

    try {
        const file = await File.findById(id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        const filePath = path.join('uploads', `${file.file_name}_${file.id}${file.file_extension}`);
        res.download(filePath);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateFile = async (req, res) => {
    const { id } = req.params;
    // const { id: userId } = req.user; user who created the file can edit only (not required)
    const { originalname, mimetype, size } = req.file;

    try {
        const fileExtension = path.extname(originalname);
        const fileName = path.basename(originalname, fileExtension);

        const file = await File.findById(id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        await File.updateById(id, fileName, fileExtension, mimetype, size);

        const oldFilePath = path.join('uploads', `${file.file_name}_${file.id}${file.file_extension}`);
        const newFilePath = path.join('uploads', `${fileName}_${id}${fileExtension}`);


        try {
            await fs.access(oldFilePath);
            await fs.unlink(oldFilePath);
        } catch (error) {
            console.error(`File not found: ${oldFilePath}`);
        }


        await fs.writeFile(newFilePath, req.file.buffer);

        res.json({ id, fileName, fileExtension, mimetype, size });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
