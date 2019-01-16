import { combineEpics } from 'redux-observable';
import { metaEpics } from '../../components/App/ducks';
import { nestEpics } from '../../components/InfoCard/NestInfo/ducks';

export default combineEpics(
	metaEpics, nestEpics,
);
