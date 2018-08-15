import { compose, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from '../app/store/reducers/root';
import rootEpic from '../app/store/epics/root';
import IS_CLIENT from './isClient';

export default (initialState, asyncMethods) => {
	const epicMiddleware = createEpicMiddleware({ dependencies: { ...asyncMethods } });

	const enhancer = compose(
		applyMiddleware(...[epicMiddleware]),
		IS_CLIENT && window.devToolsExtension ? window.devToolsExtension() : f => f,
	);
	const store = createStore(rootReducer, initialState, enhancer);
	epicMiddleware.run(rootEpic);
	return store;
};
