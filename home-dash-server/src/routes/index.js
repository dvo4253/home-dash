import express from 'express';

import authRoutes from './authentication';
import root from './root';
import nestRoutes from './nest';
import healthRoute from './health';
import fallbackRoute from './fallback';

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/health', healthRoute);
apiRouter.use('/nest', nestRoutes);
apiRouter.use('/', root);
apiRouter.use('*', fallbackRoute);

export default apiRouter;
