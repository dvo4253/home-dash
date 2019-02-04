import express from 'express';
import axios from 'axios';
import { path } from 'ramda';
import getHeaders from '../../util/getHeaders';
import { NEST_TOKEN } from '../../constants/headers';
import { buildAuthTokenHeader } from './util';

const apiRouter = express.Router();

export const getNestData = async (token) => {
	const headers = buildAuthTokenHeader(token);
	let result = {};
	try {
		result = await axios.get('https://developer-api.nest.com', { headers });
		return result.data;
	} catch (error) {
		console.log(error);
	}

	return result.data;
};

export const updateTargetTemp = async (token, deviceId, targetTemp) => {
	let result = {};
	const headers = buildAuthTokenHeader(token);

	try {
		const nestInfo = await axios.put(`https://developer-api.nest.com/devices/thermostats/${deviceId}`, { target_temperature_f: targetTemp }, { headers });
		result = nestInfo.data;
	} catch (error) {
		console.log(error);
	}

	return result;
};

const getNestDataRoute = async (req, res) => {
	const token = path([NEST_TOKEN], getHeaders(req));
	if (!token) return res.sendStatus(400);

	try {
		const nestInfo = await getNestData(token);
		return res.status(200).send(nestInfo.devices.thermostats);
	} catch (error) {
		return res.sendStatus(400);
	}
};

const updateTargetTempRoute = async (req, res) => {
	const token = req.headers[NEST_TOKEN];
	const { deviceId, target_temperature_f } = req.body; // eslint-disable-line camelcase

	if (!token) return res.sendStatus(400);

	try {
		const result = await updateTargetTemp(token, deviceId, target_temperature_f);
		return res.status(200).send(result);
	} catch (error) {
		return res.sendStatus(400);
	}
};

apiRouter.route('/nestInfo').get(getNestDataRoute);
apiRouter.route('/updateTargetTemp').put(updateTargetTempRoute);

export default apiRouter;
