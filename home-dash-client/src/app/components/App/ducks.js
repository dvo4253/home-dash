import { combineEpics, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { curry } from 'ramda';

// Actions
export const GET_LOCATION = 'meta/getLocation';
export const GET_LOCATION_SUCCESS = 'meta/getLocationSuccess';
export const GET_LOCATION_ERROR = 'meta/getLocationError';

// action creators
export const getLocation = () => ({ type: GET_LOCATION });

// Reducer
export const metaReducer = (state = { }, action = { payload: {} }) => {
	switch (action.type) {
	case GET_LOCATION:
		return {
			...state,
			position: {
				isFetching: true,
				hasError: false,
			},
		};
	case GET_LOCATION_SUCCESS:
		return {
			...state,
			position: {
				isFetching: false,
				latitude: action.payload.latitude,
				longitude: action.payload.longitude,
				hasError: false,
			},
		};
	case GET_LOCATION_ERROR:
		return {
			...state,
			position: {
				isFetching: false,
				latitude: undefined,
				longitude: undefined,
				hasError: true,
			},
		};
	default:
		return state;
	}
};

const getLocationSuccess = curry((resolve, position) => resolve({ type: GET_LOCATION_SUCCESS, payload: position.coords }));

const getLocationError = curry((reject, err) => reject(new Error({ type: GET_LOCATION_ERROR, payload: { code: err.code, message: err.message } })));


// epics
export const getLocationEpic = action$ => action$.pipe(ofType(GET_LOCATION),
	switchMap(() => new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(getLocationSuccess(resolve), getLocationError(reject)))));

export const metaEpics = combineEpics(getLocationEpic);
