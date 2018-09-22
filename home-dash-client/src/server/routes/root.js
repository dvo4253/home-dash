import express from 'express';
import React from 'react';
import reactDomServer from 'react-dom/server';
import App from '../../app/components/App';
import appUtils from '../../util';
import { createInitialState } from './util';

const { createStore, makeFetch, makePost } = appUtils;

const viewRouter = express.Router();

viewRouter.route('/').get(async (req, res) => {
	const nestToken = req.headers['nest-token'];
	const initialState = await createInitialState({ nestToken });

	const store = createStore(initialState, { makeFetch, makePost });
	const jsxString = reactDomServer.renderToString(<App store={store} />);

	res.render('output', { jsxString, __PRELOADED_STATE__: initialState });
});

export default viewRouter;
