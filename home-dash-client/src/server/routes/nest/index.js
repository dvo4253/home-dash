import express from 'express';
import axios from 'axios';

const nestRouter = express.Router();

export const getNestInfo = async (token) => {
	let nestInfo = {};
	const headers = { token };
	console.log('TCL: getNestInfo -> headers', headers);
	try {
		nestInfo = await axios.get('http://localhost:9000/home-dash-api/nest/nestInfo', { headers });
	} catch (error) {
		console.log(error);
	}

	return nestInfo;
};

export const updateTargetTemp = async (token, deviceId, targetTemp) => {
	const headers = { token };
	const data = {
		deviceId,
		target_temperature_f: targetTemp,
	};
	let result = {};

	try {
		const nestInfo = await axios.put('http://localhost:9000/home-dash-api/nest/updateTargetTemp', data, { headers });
		result = nestInfo.data;
	} catch (error) {
		console.log(error);
	}

	return result;
};

const getNestInfoRoute = async (req, res) => {
	const token = req.headers['nest-token'];
	let status = 400;
	let nestInfo = {};
	try {
		if (token) {
			nestInfo = await getNestInfo(token);
			status = nestInfo ? 200 : 204;
		} else {
			status = 401;
		}
	} catch (error) {
		status = 401;
		nestInfo = { msg: 'Invalid Request' };
		console.log(error);
	}
	return res.status(status).send(nestInfo);
};

const updateTargetTempRoute = async (req, res) => {
	// console.log('TCL: updateTargetTempRoute -> req', req);
	// console.log('TCL: updateTargetTempRoute -> req.body', req.body);

	const { token } = req.headers;
	console.log('TCL: updateTargetTempRoute -> token', token);
	const { deviceId, targetTemperatureF } = req.body;

	let status = 400;
	let nestInfo = {};

	try {
		if (token && deviceId && targetTemperatureF) {
			nestInfo = await updateTargetTemp(token, deviceId, targetTemperatureF);
			console.log('TCL: updateTargetTempRoute -> nestInfo', nestInfo);
			status = nestInfo ? 200 : 204;
		} else {
			status = 401;
		}
	} catch (error) {
		status = 401;
		nestInfo = { msg: 'Invalid Request' };
		console.log(error);
	}
	return res.status(status).send(nestInfo);
};

nestRouter.route('/nestInfo').get(getNestInfoRoute);
nestRouter.route('/updateTargetTemp').put(updateTargetTempRoute);

export default nestRouter;
