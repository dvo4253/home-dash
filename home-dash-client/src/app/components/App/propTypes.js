import propTypes from 'prop-types';

const { shape, func } = propTypes;

export default {

	store: shape({
		subscribe: func.isRequired,
		dispatch: func.isRequired,
		getState: func.isRequired,
	}).isRequired,
};
