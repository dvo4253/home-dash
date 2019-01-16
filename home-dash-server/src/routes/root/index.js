import express from 'express';
// import crypto from 'crypto';
import auth from '../authentication';
// import nestAPI from './nest';

const apiRouter = express.Router();

apiRouter.route('/').get(async (req, res) => {
	const { pincode } = req.body;
	let { token } = req.body;
	let data = {};
	try {
		if (!token && !pincode) {
			return res.sendStatus(400);
		} if (!token) {
			data = await auth.nestAuth.getToken();
			token = data.access_token;
		}

		console.log('Data: ', data);
		// const cipher = crypto.createCipher('aes256', process.env.CIPHER_PASS);
		// let encrypted = cipher.update(data.access_token, 'utf8', 'hex');
		// encrypted += cipher.final('hex');


		// const nestData = await nestAPI.getNestData(token);

		return res.status(200).json({ token });
		// return res.status(200).json(nestData.devices.thermostats);
	} catch (error) {
		console.log('ERROR: ', error);
		return res.sendStatus(404);
	}
});

export default apiRouter;
