import { combineEpics } from 'redux-observable';
import { pingEpic } from '../../components/ButtonWrapper/ducks';

export default combineEpics(
	pingEpic,
);
