import { combineEpics, ofType } from 'redux-observable';
import {
	debounceTime, map, mergeMap,
} from 'rxjs/operators';
import {
	INCREMENT_TARGET_TEMP, DECREMENT_TARGET_TEMP, UPDATE_TARGET_TEMP_SUCCESS, UPDATE_UI_TARGET_TEMP, UPDATE_NEST_TARGET_TEMP,
} from './actions';
import { updateNestStoreTargetTemp } from './actionCreators';
import { getCurrentTargetTemp, put } from './util';


export const incrementTargetTempEpic = (action$, store) => action$.pipe(ofType(INCREMENT_TARGET_TEMP, DECREMENT_TARGET_TEMP),
	map((action) => {
		// console.log('TCL: store', store);
		console.log('TCL: action', action);
		const currentTargetTemp = store.value.ui.targetTemp || getCurrentTargetTemp(store);
		console.log('TCL: currentTargetTemp', currentTargetTemp);
		let nextTargetTemp = currentTargetTemp;
		if (action.type === INCREMENT_TARGET_TEMP) nextTargetTemp = currentTargetTemp + 1;
		else if (action.type === DECREMENT_TARGET_TEMP) nextTargetTemp = currentTargetTemp - 1;
		console.log('TCL: nextTargetTemp', nextTargetTemp);
		// updateNestStoreTargetTemp(nextTargetTemp);

		return nextTargetTemp;
	}),
	mergeMap((targetTemp) => {
		console.log('TCL: targetTemp', targetTemp);

		return [{ type: UPDATE_UI_TARGET_TEMP, payload: { targetTemp } },
			{ type: UPDATE_NEST_TARGET_TEMP, payload: { targetTemp } }];
	}),
	debounceTime(500),
	// mergeMap((action) => {
	// 	console.log('TCL: action', action);

	// 	const currentTargetTemp = action.payload.targetTemp;
	// 	console.log('TCL: updateNestTargetTemp -> currentTargetTemp', currentTargetTemp);
	// 	const deviceId = Object.keys(store.value.data.nest)[0]; // getDeviceId(store, 0);
	// 	const putData = { deviceId, targetTemperatureF: currentTargetTemp };


	// 	return [{ type: UPDATE_TARGET_TEMP_SUCCESS, payload: { target_temperature_f: currentTargetTemp } }];
	// 	// const result = put('http://localhost:8000/nest/updateTargetTemp', putData, { headers })
	// 	// 	.pipe(map(response => (updateNestStoreTargetTemp(response.data))));
	// 	// console.log('TCL: result', result);
	// 	// return result;
	// })
);

export const updateNestTargetTemp = (action$, store) => action$.pipe(ofType(UPDATE_NEST_TARGET_TEMP),
	mergeMap((action) => {
		console.log('TCL: action', action);

		const currentTargetTemp = action.payload.targetTemp;
		console.log('TCL: updateNestTargetTemp -> currentTargetTemp', currentTargetTemp);
		const deviceId = Object.keys(store.value.data.nest)[0]; // getDeviceId(store, 0);
		const putData = { deviceId, targetTemperatureF: currentTargetTemp };

		return [{ type: UPDATE_TARGET_TEMP_SUCCESS, payload: { target_temperature_f: currentTargetTemp } }];
		// const result = put('http://localhost:8000/nest/updateTargetTemp', putData, { headers })
		// 	.pipe(map(response => (updateNestStoreTargetTemp(response.data))));
		// console.log('TCL: result', result);
		// return result;
	}));




	// mergeMap((targetTemp) => {
	// 	console.log('TCL: targetTemp', targetTemp);
	// 	const deviceId = Object.keys(store.value.data.nest)[0]; // getDeviceId(store, 0);
	// 	const putData = { deviceId, targetTemperatureF: targetTemp };

	// 	return [{ type: UPDATE_TARGET_TEMP_SUCCESS, payload: { target_temperature_f: targetTemp } }];
	// 	// return put('http://localhost:8000/nest/updateTargetTemp', putData, { headers })
	// 	// 	.pipe(map(response => (updateNestStoreTargetTemp(response.data))));
	// }));

	// export const decrementTargetTempEpic = (action$, store) => action$.pipe(ofType(DECREMENT_TARGET_TEMP),
	// scan(nextTargetTemp => nextTargetTemp - 1, getCurrentTargetTemp(store)),
	// debounceTime(500),
	// mergeMap((targetTemp) => {
	// 	const deviceId = Object.keys(store.value.data.nest)[0]; // getDeviceId(store, 0);
	// 	const putData = { deviceId, targetTemperatureF: targetTemp };
	// 	return put('http://localhost:8000/nest/updateTargetTemp', putData, { headers })
	// 		.pipe(map(response => (updateNestStoreTargetTemp(response.data))));
	// }));

// export const updateTemp = action$ => action$.pipe(ofType(UPDATE_TARGET_TEMP_SUCCESS));

export const nestInfoEpic = combineEpics(incrementTargetTempEpic, updateNestTargetTemp);
