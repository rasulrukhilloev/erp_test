import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const setupDatabase = async () => {
    const sqlPath = path.resolve('./config/schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    });

    try {
        const sqlCommands = sql.split(';').filter(command => command.trim());

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`);

        await connection.changeUser({ database: process.env.MYSQL_DATABASE });

        for (const command of sqlCommands) {
            await connection.query(command);
        }
        console.log('Database setup completed.');
    } catch (err) {
        console.error('Error setting up the database:', err);
        process.exit(1);
    } finally {
        await connection.end();
    }
};

setupDatabase();
