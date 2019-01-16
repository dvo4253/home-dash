import { combineEpics, ofType } from 'redux-observable';
import {
	debounceTime, map, mergeMap, switchMap, delay,
} from 'rxjs/operators';
import axios from 'axios';
import {
	INCREMENT_TARGET_TEMP, DECREMENT_TARGET_TEMP, UPDATE_TARGET_TEMP_SUCCESS, UPDATE_UI_TARGET_TEMP,
	UPDATE_NEST_TARGET_TEMP, UPDATE_UI_TARGET_TEMP_SUCCESS, UPDATE_UI_TARGET_TEMP_TOGGLE_RESET,
} from './actions';
import { updateNestStoreTargetTemp } from './actionCreators';
import { getCurrentTargetTemp } from './util';

export const changeTargetTemp = (action$, store) => action$.pipe(ofType(INCREMENT_TARGET_TEMP, DECREMENT_TARGET_TEMP),
	map((action) => {
		const currentTargetTemp = store.value.ui.nest.targetTemp || getCurrentTargetTemp(store);
		let nextTargetTemp = currentTargetTemp;

		if (action.type === INCREMENT_TARGET_TEMP) nextTargetTemp = currentTargetTemp + 1;
		else if (action.type === DECREMENT_TARGET_TEMP) nextTargetTemp = currentTargetTemp - 1;

		return nextTargetTemp;
	}),
	mergeMap(targetTemp => [{ type: UPDATE_UI_TARGET_TEMP, payload: { targetTemp } },
		{ type: UPDATE_NEST_TARGET_TEMP, payload: { targetTemp } }]));

export const updateNestTargetTemp = (action$, store) => action$.pipe(ofType(UPDATE_NEST_TARGET_TEMP), debounceTime(1000),
	map((action) => {
		const currentTargetTemp = action.payload.targetTemp;
		const deviceId = Object.keys(store.value.data.nest)[0]; // getDeviceId(store, 0);
		const putData = { deviceId, targetTemperatureF: currentTargetTemp };

		return putData;
	}),
	switchMap(putData => axios.put('http://localhost:8000/nest/updateTargetTemp', putData, { }).then(response => response.data)),
	mergeMap((response) => {
		updateNestStoreTargetTemp(response);
		return [
			{
				type: UPDATE_TARGET_TEMP_SUCCESS,
				payload: { target_temperature_f: response.target_temperature_f },
			},
			{
				type: UPDATE_UI_TARGET_TEMP_SUCCESS,
				payload: { isUpdating: false, successToggle: true },
			}];
	}));

export const resetTargetTempSuccess = action$ => action$.pipe(ofType(UPDATE_UI_TARGET_TEMP_SUCCESS), delay(50),
	map(() => ({ type: UPDATE_UI_TARGET_TEMP_TOGGLE_RESET, payload: { successToggle: false } })));

export const nestInfoEpic = combineEpics(changeTargetTemp, updateNestTargetTemp, resetTargetTempSuccess);
