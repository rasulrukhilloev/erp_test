import db from '../../config/db.js';
import { createUserQuery, findUserByEmailQuery, findUserByIdQuery } from '../queries/index.js';

const User = {
    create: async (email, password) => {
        const [result] = await db.query(createUserQuery, [email, password]);
        return result.insertId;
    },

    findByEmail: async (email) => {
        const [rows] = await db.query(findUserByEmailQuery, [email]);
        return rows[0];
    },

    findById: async (id) => {
        const [rows] = await db.query(findUserByIdQuery, [id]);
        return rows[0];
    }
};

export default User;
