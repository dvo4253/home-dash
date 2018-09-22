import { getNestInfo } from '../nest';
// import initialAppState from '../../../util/initialAppState';

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

	try {
		nestInfo = await getNestInfo(nestToken);

		initialState = {
			...initialState,
			data: {
				...initialState.data,
				nest: nestInfo.data,
			},
		};
	} catch (error) {
		console.log(error);
	}

	return initialState;
};
