import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { PING } from './ducks';

const ButtonWrapper = ({ ping, isPinging, text }) => (
	<div>
		<h1>is pinging: {isPinging().toString()}</h1>
		<button type="submit" onClick={ping}>{text}</button>
	</div>
);

ButtonWrapper.propTypes = {
	ping: propTypes.func.isRequired,
	isPinging: propTypes.func.isRequired,
	text: propTypes.string.isRequired,
};

const mapStateToProps = state => ({
	...state,
	isPinging: () => (state.ui.isPinging || false),
});

export default connect(mapStateToProps,
	{ ping: () => ({ type: PING }) })(ButtonWrapper);
