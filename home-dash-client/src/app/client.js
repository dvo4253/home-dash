/* eslint-disable global-require */

import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import App from './App';

const render = (Component) => {
	ReactDOM.hydrate(
		<Component />,
		document.getElementById('app'),
	);
};

render(App);

/**
* This script provides hot module reloading in development mode.
*/
if (module.hot && process.env.NODE_ENV === 'development') {
	module.hot.accept('./App', () => {
		const reactApp = require('./App').default;
		render(reactApp);
	});
}
