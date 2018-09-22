import axios from 'axios';
import querystring from 'querystring';

// application/x-www-form-urlencoded
const getToken = async () => {

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  console.log("NEST_CLIENT_ID: ", process.env.NEST_CLIENT_ID)
  console.log("NEST_CLIENT_SECRET: ", process.env.NEST_CLIENT_SECRET)
  const data = querystring.stringify({
    client_id: process.env.NEST_CLIENT_ID, //gave the values directly for testing
    client_secret: process.env.NEST_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code: pincode
  })

  //console.log("Data: ", data)


  try {
    const result = await axios.post('https://api.home.nest.com/oauth2/access_token', data)

    //console.log("result: ", result)

    return result.data;
  }
  catch (error) {
    console.log(error);
    return error;
  }
}

const checkAuth = (req, res) => {
  const {token} = req.body;

  if (token) {
    const options = {
      "headers": {
         "Authorization": "Bearer " + token
      },
      "followRedirect": true
    }
    axios.get('https://developer-api.nest.com', options)
    .then(response => {
      console.log(response)
    })
  }
  else {
    res.status(401).json({msg: 'Unauthorized'})
  }

}

export default {
  getToken,
  checkAuth
}
