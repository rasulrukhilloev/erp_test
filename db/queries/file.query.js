export const createFileQuery = 'INSERT INTO files (user_id, file_name, file_extension, mime_type, file_size) VALUES (?, ?, ?, ?, ?)';
export const findAllFilesQuery = 'SELECT * FROM files LIMIT ? OFFSET ?';
export const findFileByIdQuery = 'SELECT * FROM files WHERE id = ?';
export const deleteFileByIdQuery = 'DELETE FROM files WHERE id = ?';
export const updateFileByIdQuery = 'UPDATE files SET file_name = ?, file_extension = ?, mime_type = ?, file_size = ? WHERE id = ?';
