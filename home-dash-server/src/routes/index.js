import express from 'express';

import root from './root';
import nestRoutes from './nest';

let apiRouter = express.Router();

apiRouter.use('/', root);
apiRouter.use('/nest', nestRoutes);

export default apiRouter;
