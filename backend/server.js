import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './src/config/logger.js';
import httpLogger from './src/middlewares/httpLogger.js';
import errorHandler from './src/middlewares/errorHandler.js';
import corsOptions from './src/config/cors.js';
import { swaggerUi, swaggerSpec } from './src/config/swagger.js';
import authRoutes from './src/routes/auth.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'ITS SYSTEMS API - E-commerce + CMS',
    version: '1.0.0',
    docs: '/api-docs',
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`🚀 Servidor corriendo en puerto ${PORT}`);
  logger.info(`📝 Entorno: ${process.env.NODE_ENV || 'development'}`);
});
