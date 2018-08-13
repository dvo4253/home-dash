import express from 'express';

const fallbackRouter = express.Router();

fallbackRouter.route('*').get((req, res) => {
	res.status(404).send({ msg: 'Not Found' });
});

export default fallbackRouter;
