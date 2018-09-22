import PropTypes from 'prop-types';

const {
	shape, number,
} = PropTypes;

export const propTypes = {
	userPosition: shape({ latitude: number, longitude: number }).isRequired,
};
