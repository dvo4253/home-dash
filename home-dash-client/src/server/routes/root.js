import express from 'express';
import React from 'react';
import reactDomServer from 'react-dom/server';
import App from '../../app/App';
import appUtils from '../../util';
import { createInitialState } from './util';

const { createStore, makeFetch, makePost } = appUtils;

const viewRouter = express.Router();

viewRouter.route('/').get((req, res) => {
	const initialState = createInitialState();

	const store = createStore(initialState, { makeFetch, makePost });
	const jsxString = reactDomServer.renderToString(<App store={store} />);
	res.render('output', { jsxString });
});

export default viewRouter;
