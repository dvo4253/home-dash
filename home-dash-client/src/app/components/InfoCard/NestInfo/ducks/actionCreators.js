import {
	INCREMENT_TARGET_TEMP,
	// UPDATE_TARGET_TEMP_SUCCESS,
	DECREMENT_TARGET_TEMP,
	UPDATE_NEST_TARGET_TEMP,
} from './actions';

export const incrementTargetTemp = targetTemp => ({
	type: INCREMENT_TARGET_TEMP,
	payload: { targetTemp },
});

export const decrementTargetTemp = targetTemp => ({
	type: DECREMENT_TARGET_TEMP,
	payload: { targetTemp },
});

export const updateNestStoreTargetTemp = deviceData => ({
	type: UPDATE_NEST_TARGET_TEMP,
	payload: deviceData,
});
