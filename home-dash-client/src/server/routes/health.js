import express from 'express';
import os from 'os';

const healthRouter = express.Router();

healthRouter.route('/').get((req, res) => {
	res.status(200).send({ host: os.hostname() });
});

export default healthRouter;
