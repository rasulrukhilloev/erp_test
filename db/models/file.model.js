import db from '../../config/db.js';
import {
    createFileQuery,
    findAllFilesQuery,
    findFileByIdQuery,
    deleteFileByIdQuery,
    updateFileByIdQuery
} from '../queries/index.js';

const File = {
    create: async (userId, fileName, fileExtension, mimeType, fileSize) => {
        const [result] = await db.query(createFileQuery, [userId, fileName, fileExtension, mimeType, fileSize]);
        return result.insertId;
    },

    findAll: async (limit, offset) => {
        const [rows] = await db.query(findAllFilesQuery, [limit, offset]);
        return rows;
    },

    findById: async (id) => {
        const [rows] = await db.query(findFileByIdQuery, [id]);
        return rows[0];
    },

    deleteById: async (id) => {
        await db.query(deleteFileByIdQuery, [id]);
    },

    updateById: async (id, fileName, fileExtension, mimeType, fileSize) => {
        await db.query(updateFileByIdQuery, [fileName, fileExtension, mimeType, fileSize, id]);
    }
};

export default File;
