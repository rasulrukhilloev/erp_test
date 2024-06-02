import db from '../../config/db.js';
import { findValidTokenQuery,
    createTokenQuery,
    invalidateTokenQuery,
    findValidRefreshTokenQuery,
    invalidateTokensForDeviceQuery } from '../queries/index.js';

const Token = {
    createToken: async (userId, bearerToken, refreshToken, expiresAt, deviceId) => {
        await db.query(createTokenQuery, [userId, bearerToken, refreshToken, expiresAt, deviceId]);
    },

    findValidToken: async (bearerToken) => {
        const [rows] = await db.query(findValidTokenQuery, [bearerToken]);
        return rows[0];
    },

    invalidateToken: async (bearerToken, deviceId) => {
        await db.query(invalidateTokenQuery, [bearerToken, deviceId]);
    },

    findValidRefreshToken: async (refreshToken) => {
        const [rows] = await db.query(findValidRefreshTokenQuery, [refreshToken]);
        return rows[0];
    },

    invalidateTokensForDevice: async (userId, deviceId) => {
        await db.query(invalidateTokensForDeviceQuery, [userId, deviceId]);
    }
};

export default Token;