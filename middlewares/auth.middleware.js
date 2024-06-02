import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import { Token } from '../db/models/index.js';

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const rows = await Token.findValidToken(token);

        if (rows.length === 0) {
            return res.sendStatus(403);
        }

        req.user = decoded;
        next();
    } catch (err) {
        console.log(err)
        return res.sendStatus(403);
    }
};