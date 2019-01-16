/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
import { AppContainer } from 'react-hot-loader';
import React from 'react';

import { hydrate, render } from 'react-dom';
import App from './components/App';
import appUtils from '../util';

const { createStore, makeFetch, makePost } = appUtils;

const renderEntry = (Component) => {
	console.log('State: ', window.__PRELOADED_STATE__);
	const store = createStore(window.__PRELOADED_STATE__, { makeFetch, makePost });

	hydrate(
		<AppContainer>
			<Component store={store} />
		</AppContainer>,
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
