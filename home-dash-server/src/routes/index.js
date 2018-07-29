import express from 'express';

import root from './root';
import nestRoutes from './nest';
import healthRoute from './health';
import fallbackRoute from './fallback';

let apiRouter = express.Router();
apiRouter.use('/health', healthRoute);
apiRouter.use('/nest', nestRoutes);
apiRouter.use('/', root);
apiRouter.use('*', fallbackRoute);

export default apiRouter;
