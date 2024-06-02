import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { authRoutes, userRoutes, fileRoutes } from './routes/index.js';
import { authenticateToken, errorHandler } from './middlewares/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/file', authenticateToken, fileRoutes);
app.use('/user', authenticateToken, userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
export default app;
