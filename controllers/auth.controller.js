import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User, Token } from '../db/models/index.js';

export const signin = async (req, res) => {
    const { email, password, deviceId } = req.body;

    if (!email || !password || !deviceId) {
        return res.status(400).json({ message: 'Email, password, and deviceId are required' });
    }

    try {
        const user = await User.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.user_password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        await Token.invalidateTokensForDevice(user.id, deviceId);

        const tokens = await generateTokens(user, deviceId);
        res.json(tokens);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const signup = async (req, res) => {
    const { email, password, deviceId } = req.body;

    if (!email || !password || !deviceId) {
        return res.status(400).json({ message: 'Email, password, and deviceId are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await User.create(email, hashedPassword);
        const user = { id: userId, email };

        const tokens = await generateTokens(user, deviceId);
        res.json(tokens);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const refreshToken = async (req, res) => {
    const { refreshToken, deviceId } = req.body;

    if (!refreshToken || !deviceId) {
        return res.status(400).json({ message: 'Refresh token and deviceId are required' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const tokenRecord = await Token.findValidRefreshToken(refreshToken);

        if (!tokenRecord) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const newTokens = await generateTokens({ id: decoded.id }, deviceId);
        res.json(newTokens);
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader && authHeader.split(' ')[1];
    const { deviceId } = req.body;

    if (!bearerToken || !deviceId) {
        return res.status(400).json({ message: 'token and deviceId are required' });
    }

    try {
        await Token.invalidateToken(bearerToken, deviceId);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: error.message });
    }
};

export const generateTokens = async (user, deviceId) => {
    const bearerToken = jwt.sign({ id: user.id, deviceId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
    const refreshToken = jwt.sign({ id: user.id, deviceId  }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await Token.createToken(user.id, bearerToken, refreshToken, expiresAt, deviceId);

    return { bearerToken, refreshToken };
};
