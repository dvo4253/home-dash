import * as actionCreators from './actionCreators';
import * as epics from './epics';
import * as reducers from './reducers';

export const nestActionCreators = actionCreators;
export const nestEpics = epics.nestInfoEpic;
export const nestReducers = reducers;

export default {};
