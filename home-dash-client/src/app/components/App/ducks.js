import { combineEpics, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

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


// epics
export const getLocationEpic = action$ => action$.pipe(ofType(GET_LOCATION),
	switchMap(() => new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(position => resolve({ type: GET_LOCATION_SUCCESS, payload: position.coords }), () => reject(new Error({ type: GET_LOCATION_SUCCESS }))))));

export const metaEpics = combineEpics(getLocationEpic);
