// global put using axios
import axios from 'axios';

export const checkStatus = (response) => {
	if (response.status < 200 && response.status >= 300) { // status in the range 200-299 or not
		return Promise.reject(new Error(response.statusText || 'Status not OK'));
	}

	return response;
};

export const parseJSON = response => response.data;

export default (url, data, config) => axios.post(url, data, config)
	.then(checkStatus)
	.then(parseJSON)
	.catch((err) => { console.log("I'm Caught: ", err); });
