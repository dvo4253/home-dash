import R from 'ramda';
import getHeaders from './getHeaders';
import { NEST_TOKEN } from '../constants/headers';
import { getNestAuthUrl } from '../routes/authentication/nest-api/util';

export const checkTokens = (req, res, next) => {
	const headers = getHeaders(req);
	const { code } = req.query;
	console.log('ORIGINAL originalUrl: ', req.originalUrl);
	console.log('ORIGINAL URL: ', req.url);
	console.log('x-original-uri: ', headers['x-original-uri']);

	const url = headers['x-original-uri'] || req.originalUrl;
	// Check Nest Auth
	if (url !== '/home-dash-api/health' && (!code && !R.path([NEST_TOKEN], headers))) {
		return res.status(302).send({ authUrl: getNestAuthUrl() });
	}

	return next();
};
