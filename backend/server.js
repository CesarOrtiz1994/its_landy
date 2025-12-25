import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './src/config/logger.js';
import httpLogger from './src/middlewares/httpLogger.js';
import errorHandler from './src/middlewares/errorHandler.js';
import corsOptions from './src/config/cors.js';
import { swaggerUi, swaggerSpec } from './src/config/swagger.js';
import authRoutes from './src/routes/auth.routes.js';
import cmsRoutes from './src/routes/cms.routes.js';
import usersRoutes from './src/routes/users.routes.js';
import addressRoutes from './src/routes/address.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);

// Servir archivos estáticos de uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
app.use('/api/cms', cmsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/addresses', addressRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`🚀 Servidor corriendo en puerto ${PORT}`);
  logger.info(`📝 Entorno: ${process.env.NODE_ENV || 'development'}`);
});
