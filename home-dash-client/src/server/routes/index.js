import express from 'express';
import health from './health';
import fallback from './fallback';
import root from './root';

const router = express.Router();
router.use('/health', health);
router.use('/', root);
router.use('*', fallback);

export default router;
