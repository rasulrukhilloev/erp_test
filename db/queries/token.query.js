export const findValidTokenQuery = 'SELECT * FROM tokens WHERE bearer_token = ? AND is_valid = TRUE';
export const createTokenQuery = 'INSERT INTO tokens (user_id, bearer_token, refresh_token, expires_at, device_id) VALUES (?, ?, ?, ?, ?)';
export const invalidateTokenQuery = 'UPDATE tokens SET is_valid = FALSE WHERE bearer_token = ? AND device_id = ?';
export const findValidRefreshTokenQuery = 'SELECT * FROM tokens WHERE refresh_token = ? AND is_valid = TRUE';
export const invalidateTokensForDeviceQuery = 'UPDATE tokens SET is_valid = FALSE WHERE user_id = ? AND device_id = ?';

