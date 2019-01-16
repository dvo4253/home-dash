import express from 'express';
import axios from 'axios';
import querystring from 'querystring';

const apiRouter = express.Router();

// application/x-www-form-urlencoded
export const getToken = async (pincode) => {
	const data = querystring.stringify({
		client_id: process.env.NEST_CLIENT_ID, // gave the values directly for testing
		client_secret: process.env.NEST_SECRET_ID,
		grant_type: 'authorization_code',
		code: pincode,
	});

	try {
		const result = await axios.post('https://api.home.nest.com/oauth2/access_token', data);

		return result.data;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const checkAuth = (req, res) => {
	const { token } = req.body;

	if (token) {
		const options = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			followRedirect: true,
		};
		axios.get('https://developer-api.nest.com', options)
			.then((response) => {
				console.log(response);
			});
	} else {
		res.status(401).json({ msg: 'Unauthorized' });
	}
};

export const verifyAuth = async (req, res) => {
	const { code } = req.query;

	const { access_token, expires_in } = await getToken(code); // eslint-disable-line camelcase

	res.send({ token: access_token, expires_in });
};

apiRouter.route('/checkAuth').get(checkAuth);
apiRouter.route('/verifyAuth').get(verifyAuth);
export default apiRouter;
