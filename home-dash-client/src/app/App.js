import React from 'react';
import { Provider } from 'react-redux';
import propTypes from 'prop-types';
import ButtonWrapper from './components/ButtonWrapper';

const App = ({ store }) => (
	<Provider store={store}>
		<div>
			<div>This a basic SSR React app rendered using pug as a template engine on the server.</div>
			<ButtonWrapper text="Start PING" />
		</div>
	</Provider>
);

App.propTypes = {

	store: propTypes.shape({
		subscribe: propTypes.func.isRequired,
		dispatch: propTypes.func.isRequired,
		getState: propTypes.func.isRequired,
	}).isRequired,
};

export default App;
