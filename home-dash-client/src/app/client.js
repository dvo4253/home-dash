/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './App';
import appUtils from '../util';

const { createStore, makeFetch, makePost } = appUtils;

const renderEntry = (Component) => {
	const store = createStore(window.__STATE__, { makeFetch, makePost });

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
	module.hot.accept('./App', () => {
		const reactApp = require('./App').default;
		render(reactApp);
	});
}
