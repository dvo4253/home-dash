import express from 'express';
import React from 'react';
import reactDomServer from 'react-dom/server';
import App from '../../app/App';

const viewRouter = express.Router();

viewRouter.route('/').get((req, res) => {
	const jsxString = reactDomServer.renderToString(<App />);
	res.render('output', { jsxString });
});

export default viewRouter;
