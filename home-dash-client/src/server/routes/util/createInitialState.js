import { getNestInfo } from '../nest';

export default async (authInfo = {}) => {
	let nestInfo = {};
	let initialState = {
		meta: {},
		ui: {},
		data: {
			nest: {},
		},
	};

	const { nestToken } = authInfo;
	let res = {
		initialState,
	};

	try {
		nestInfo = await getNestInfo(nestToken);

		if (nestInfo.status === 200) {
			const devices = Object.keys(nestInfo.data);
			initialState = {
				...initialState,
				ui: {
					nest: {
						target: {
							temperature: nestInfo.data[devices[0]].target_temperature_f,
							scale: 'f',
						},
					},
				},
				data: {
					...initialState.data,
					nest: nestInfo.data,
				},
			};

			res = {
				...res,
				initialState,
			};
		}

		if (nestInfo.status === 302) {
			res = {
				...res,
				data: nestInfo.data,
			};
		}
	} catch (error) {
		console.log(error);
	}

	res = {
		...res,
		status: nestInfo.status,
	};

	return res;
};
