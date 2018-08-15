import { combineReducers } from 'redux';

import { pingReducer } from '../../components/ButtonWrapper/ducks';

const rootReducer = combineReducers({
	ui: pingReducer,
	data: (state = {}) => state,
});

export default rootReducer;
