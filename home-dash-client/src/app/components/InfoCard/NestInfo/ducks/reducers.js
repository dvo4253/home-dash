import { getDeviceId } from './util';
import {
	INCREMENT_TARGET_TEMP, UPDATE_TARGET_TEMP_SUCCESS, UPDATE_TARGET_TEMP_ERROR, DECREMENT_TARGET_TEMP, UPDATE_UI_TARGET_TEMP, UPDATE_NEST_TARGET_TEMP,
} from './actions';

// UI Reducer
export const nestInfoReducerUI = (state = { }, action = { payload: {} }) => {
	console.log('TCL: nestInfoReducer -> action', action);

	// const deviceId = getDeviceId(state, 0);

	switch (action.type) {
	case INCREMENT_TARGET_TEMP:
		return {
			...state,
			targetTemp: action.payload.targetTemp + 1,
			hasError: false,
		};
	case DECREMENT_TARGET_TEMP:
		return {
			...state,
			targetTemp: action.payload.targetTemp - 1,
			hasError: false,
		};
	case UPDATE_UI_TARGET_TEMP:
		return {
			...state,
			targetTemp: action.payload.targetTemp,
		}
	default:
		return state;
	}
};


export const nestInfoReducerData = (state = { }, action = { payload: {} }) => {

	const deviceId = getDeviceId(state, 0);

	switch (action.type) {
	case UPDATE_NEST_TARGET_TEMP:
		return {
			...state,
			isUpdating: true,
		}
	case UPDATE_TARGET_TEMP_SUCCESS:
		return {
			...state,
			[deviceId]: {
				...state[deviceId],
				...action.payload,
			},
			hasError: false,
			isUpdating: false,
		};
	case UPDATE_TARGET_TEMP_ERROR:
		return {
			...state,
			hasError: true,
			isUpdating: false,
		};

	default:
		return state;
	}
};
