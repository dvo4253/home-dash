import express from 'express';
import R from 'ramda';
import { get, put } from '../util/axios';
import getCookies from '../../../util/getCookies';
import { NEST_TOKEN } from '../../../constants';
import DOMAINS from '../util/domains';

const nestRouter = express.Router();

export const getNestInfo = async (token = '') => {
	const headers = { [NEST_TOKEN]: token };
	return get(`${DOMAINS.HOME_DASH_API}/nest/nestInfo`, { headers });
};

export const updateTargetTemp = async (token, deviceId, targetTemp) => {
	const headers = { [NEST_TOKEN]: token };
	const data = {
		deviceId,
		target_temperature_f: targetTemp,
	};
	let result = {};

	const nestInfo = await put(`${DOMAINS.HOME_DASH_API}/nest/updateTargetTemp`, data, { headers });
	result = nestInfo.data;

	return result;
};

const getNestInfoRoute = async (req, res) => {
	const cookies = getCookies(req);
	const token = R.path([NEST_TOKEN], cookies);
	let status = 400;
	let nestInfo = {};

	nestInfo = await getNestInfo(token);

	if (nestInfo.status === 302) {
		return res.status(nestInfo.status).redirect(nestInfo.data.authUrl);
	}

	status = nestInfo ? 200 : 204;
	return res.status(status).send(nestInfo);
};

const updateTargetTempRoute = async (req, res) => {
	const cookies = getCookies(req);
	const token = R.path([NEST_TOKEN], cookies);
	const { deviceId, targetTemperatureF } = req.body;

	let status = 400;
	let nestInfo = {};

	if (token && deviceId && targetTemperatureF) {
		nestInfo = await updateTargetTemp(token, deviceId, targetTemperatureF);
		status = nestInfo ? 200 : 204;
	} else {
		status = 401;
	}
	return res.status(status).send(nestInfo);
};

export const nestAuth = async (req, res) => {
	const { code } = req.query;

	const response = await get(`${DOMAINS.HOME_DASH_API}/auth/nest/verifyAuth?code=${code}`); // eslint-disable-line camelcase
	res.cookie(
		NEST_TOKEN,
		response.data.token, {
			httpOnly: true,
			secure: true,
			expire: response.data.expires_in,
		},
	);
	res.redirect(DOMAINS.HOME_DASH_DOMAIN);
};

nestRouter.route('/nestInfo').get(getNestInfoRoute);
nestRouter.route('/updateTargetTemp').put(updateTargetTempRoute);
nestRouter.route('/auth').get(nestAuth);

export default nestRouter;
