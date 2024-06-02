import {User} from '../db/models/index.js';

export const getUserInfo = async (req, res) => {
    const { id, deviceId } = req.user;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ id: user.id, email: user.email, deviceId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
