export const createUserQuery = 'INSERT INTO users (email, user_password) VALUES (?, ?)';
export const findUserByEmailQuery = 'SELECT * FROM users WHERE email = ?';
export const findUserByIdQuery = 'SELECT * FROM users WHERE id = ?';
