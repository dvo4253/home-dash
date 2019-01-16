import { compose, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from '../app/store/reducers/root';
import rootEpic from '../app/store/epics/root';
import IS_CLIENT from './isClient';

export default (initialState, asyncMethods) => {
	const epicMiddleware = createEpicMiddleware({ dependencies: { ...asyncMethods } });

	const enhancer = compose(
		applyMiddleware(...[epicMiddleware]),
		IS_CLIENT && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f, // eslint-disable-line no-underscore-dangle
	);
	const store = createStore(rootReducer, initialState, enhancer);
	epicMiddleware.run(rootEpic);
	return store;
};
