import express from 'express';
import nestAuthRoutes from './nest-api';

const apiRouter = express.Router();

apiRouter.use('/nest', nestAuthRoutes);

export default apiRouter;
