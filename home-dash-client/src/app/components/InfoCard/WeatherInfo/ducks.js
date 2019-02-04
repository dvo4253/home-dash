// import { combineEpics, ofType } from 'redux-observable';
// import { switchMap } from 'rxjs/operators';

// // Actions
// export const GET_LOCATION = 'WeatherInfo/getLocation';
// export const GET_LOCATION_SUCCESS = 'WeatherInfo/getLocationSuccess';

// // action creators
// export const getLocation = () => ({ type: GET_LOCATION });

// // Reducer
// export const weatherInfoReducer = (state = { }, action = { payload: {} }) => {

// 	switch (action.type) {
// 	case GET_LOCATION:
// 		return {
// 			...state,
// 			position: {
// 				isFetching: true,
// 			},
// 		};
// 	case GET_LOCATION_SUCCESS:
// 		return {
// 			...state,
// 			position: {
// 				isFetching: false,
// 				latitude: action.payload.latitude,
// 				longitude: action.payload.longitude,
// 			},
// 		};

// 	default:
// 		return state;
// 	}
// };


// // epics
// export const getLocationEpic = action$ => action$.pipe(ofType(GET_LOCATION),
// 	switchMap(() => new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(
// position => resolve({
// type: GET_LOCATION_SUCCESS, payload: position.coords }), error => reject(error)))));

// export const weatherInfoEpic = combineEpics(getLocationEpic);
