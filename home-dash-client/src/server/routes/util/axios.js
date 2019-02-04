import axios from 'axios';

const getRedirectUrl = (res) => {
	console.log('GETTING REDIRECT URL: ');
	if (res.data.authUrl) {
		return res.data.authUrl;
	}

	return '';
};

const handleError = (error) => {
	console.log('ERROR: ', error);
	const { response } = error;
	let res = {
		status: response.status,
		message: error.toString(),
	};

	if (response.status === 302) {
		res = {
			...res,
			data: {
				redirectUrl: getRedirectUrl(response),
			},
		};
	}
	return res;
};

export const get = async (url, options) => axios.get(url, options).catch(handleError);

export const put = async (url, data, options) => axios.put(url, data, options).catch(handleError);
