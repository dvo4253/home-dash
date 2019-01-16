import { combineReducers } from 'redux';
// import initialAppState from '../../../util/initialAppState';
import { metaReducer } from '../../components/App/ducks';
import { nestReducers } from '../../components/InfoCard/NestInfo/ducks';

const rootReducer = combineReducers({
	meta: metaReducer,
	ui: combineReducers({
		nest: nestReducers.nestInfoReducerUI,
	}),
	data: combineReducers({
		nest: nestReducers.nestInfoReducerData,
	}),
});

export default rootReducer;
