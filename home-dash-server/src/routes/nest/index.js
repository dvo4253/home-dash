import express from 'express';
import axios from 'axios';

const apiRouter = express.Router();

const buildAuthTokenHeader = tokenVal => ({ Authorization: `Bearer ${tokenVal}` });

export const getNestData = async (token) => {
  const headers = buildAuthTokenHeader(token);

  try {
    const result = await axios.get('https://developer-api.nest.com', { headers })
    return result.data;
  }
  catch (error) {
    console.log(error);
  }
};

export const updateTargetTemp = async (token, deviceId, targetTemp) => {
	let result = {};
	const headers = buildAuthTokenHeader(token);

	try {
    const nestInfo = await axios.put(`https://developer-api.nest.com/devices/thermostats/${deviceId}`, {target_temperature_f: targetTemp}, { headers });
    result = nestInfo.data;

	} catch (error) {
		console.log(error);
	}

	return result;
}

const getNestDataRoute = async (req, res) => {
  const token = req.headers['token'];
  if (!token) return res.sendStatus(400)

  try {

    const nestInfo = await getNestData(token)
    return res.status(200).send(nestInfo.devices.thermostats)
  }
  catch (error) {
    return res.sendStatus(400)
  }
}

const updateTargetTempRoute = async (req, res) => {
  const token = req.headers['token'];
  const { deviceId, target_temperature_f } = req.body;

  if (!token) return res.sendStatus(400)

  try {

    const result = await updateTargetTemp(token, deviceId, target_temperature_f)
    return res.status(200).send(result)
  }
  catch (error) {
    return res.sendStatus(400)
  }
}

apiRouter.route('/nestInfo').get(getNestDataRoute);
apiRouter.route('/updateTargetTemp').put(updateTargetTempRoute)

export default apiRouter;
