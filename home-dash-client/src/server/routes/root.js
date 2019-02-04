import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import reactDomServer from 'react-dom/server';
import App from '../../app/components/App';
import appUtils from '../../util';
import { NEST_TOKEN } from '../../constants';
import { createInitialState } from './util';

const { createStore, makeFetch, makePost } = appUtils;

const viewRouter = express.Router();

viewRouter.route('/').get(async (req, res) => {
	const nestToken = req.cookies[NEST_TOKEN];
	const { status, data, initialState } = await createInitialState({ nestToken });

	if (status === 302) {
		return res.status(status).redirect(data.redirectUrl);
	}

	if (status === 200) {
		const store = createStore(initialState, { makeFetch, makePost });
		const jsxString = reactDomServer.renderToString(
			<Provider store={store}>
				<App />
			</Provider>,
		);

		return res.render('output', { /* csrfToken: req.csrfToken() , */jsxString, __PRELOADED_STATE__: initialState });
	}

	return res.status(404).send();
});

export default viewRouter;
