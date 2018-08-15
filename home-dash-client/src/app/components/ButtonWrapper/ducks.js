import { combineEpics } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators';

export const PING = 'ButtonWrapper/PING';
export const PONG = 'ButtonWrapper/PONG';

export const pingReducer = (state = { isPinging: false }, action) => {
	switch (action.type) {
	case PING:
		return { isPinging: true };

	case PONG:
		return { isPinging: false };

	default:
		return state;
	}
};

export const pingEpic = action$ => action$.ofType(PING).pipe(
	delay(1000), // Asynchronously wait 1000ms then continue
	mapTo({ type: PONG }),
);

export const epics = combineEpics(pingEpic);
