import R from 'ramda';
import getHeaders from './getHeaders';
import { NEST_TOKEN } from '../constants/headers';
import { getNestAuthUrl } from '../routes/authentication/nest-api/util';

export const checkTokens = (req, res, next) => {
	const headers = getHeaders(req);
	const { code } = req.query;

	// Check Nest Auth
	if (req.originalUrl !== '/home-dash-api/health' && (!code && !R.path([NEST_TOKEN], headers))) {
		return res.status(302).send({ authUrl: getNestAuthUrl() });
	}

	return next();
};
