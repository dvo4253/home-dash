import { getDeviceId } from './util';
import {
	INCREMENT_TARGET_TEMP, UPDATE_TARGET_TEMP_SUCCESS, UPDATE_TARGET_TEMP_ERROR,
	DECREMENT_TARGET_TEMP, UPDATE_UI_TARGET_TEMP, UPDATE_NEST_TARGET_TEMP,
	UPDATE_UI_TARGET_TEMP_SUCCESS, UPDATE_UI_TARGET_TEMP_TOGGLE_RESET,
} from './actions';

const initialState = {
	target: {
		temperature: 0,
		scale: 'f',
	},
};
// UI Reducer
export const nestInfoReducerUI = (state = initialState, action = { payload: {} }) => {
	switch (action.type) {
	case INCREMENT_TARGET_TEMP:
		return {
			...state,
			target: {
				temperature: action.payload.targetTemp,
				isUpdating: true,
			},
		};
	case DECREMENT_TARGET_TEMP:
		return {
			...state,
			target: {
				temperature: action.payload.targetTemp,
				isUpdating: true,
			},
		};
	case UPDATE_UI_TARGET_TEMP:
		return {
			...state,
			target: {
				temperature: action.payload.targetTemp,
			},
		};
	case UPDATE_UI_TARGET_TEMP_SUCCESS:
		return {
			...state,
			target: {
				...state.target,
				isUpdating: action.payload.isUpdating,
				successToggle: action.payload.successToggle,
			},
		};
	case UPDATE_UI_TARGET_TEMP_TOGGLE_RESET:
		return {
			...state,
			target: {
				...state.target,
				successToggle: action.payload.successToggle,
			},
		};
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
		};
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
