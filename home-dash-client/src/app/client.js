/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { Provider } from 'react-redux';
import { hydrate, render } from 'react-dom';
import App from './components/App';
import appUtils from '../util';

const { createStore, makeFetch, makePost } = appUtils;

const renderEntry = (Component) => {
	const store = createStore(window.__PRELOADED_STATE__, { makeFetch, makePost });

	hydrate(
		<Provider store={store}>
			<Component />
		</Provider>,
		document.getElementById('app'),
	);
};

renderEntry(App);

/**
* This script provides hot module reloading in development mode.
*/
if (module.hot && process.env.NODE_ENV === 'development') {
	module.hot.accept('./components/App', () => {
		const reactApp = require('./components/App').default;
		render(reactApp);
	});
}
