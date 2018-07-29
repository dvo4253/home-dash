import express from 'express';
import axios from 'axios';

const apiRouter = express.Router();

const getNestDataRoute = async (req, res) => {
  if (!req.body) return res.sendStatus(400)
  const { token } = req.body;

  if (!token) return res.sendStatus(400)

  try {

    const nestInfo = await getNestData(token)
    return res.status(200).send(nestInfo.devices.thermostats)
  }
  catch (error) {
    return res.sendStatus(400)
  }
}

export const getNestData = async (token) => {
  const headers = {
    'Authorization': `Bearer ${token}`
  }

  try {
    const result = await axios.get('https://developer-api.nest.com', { headers })
    return result.data
  }
  catch (error) {
    console.log(error);
  }
};

apiRouter.route('/nestInfo').post(getNestDataRoute);

export default apiRouter;
