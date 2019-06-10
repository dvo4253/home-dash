export default {
	gridRow: {
		padding: '2vh',
	},
	title: {
		textSize: '3rem',
		textAlign: 'center',
	},
	indoor: {
		position: 'relative',
		float: 'left',
	},
	indoorTemp: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
		fontSize: '5rem',
	},
	indoorTempUp: {
		fontSize: '2rem',
		transform: 'rotate(-90deg)',
	},
	indoorTempButton: {
		transform: 'translate(-50%,0%)',
		left: '50%',
	},
	indoorTempDown: {
		fontSize: '2rem',
		transform: 'rotate(90deg)',
	},
	transition: {
		'-webkit-transition': 'background-color 1s linear',
		/* For Safari 3.1 to 6.0 */
		transition: 'background-color 1s linear',
	},
	outdoor: {
		position: 'relative',
		float: 'right',
	},
	outdoorTemp: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	label: {
		fontSize: '2rem',
		textAlign: 'center',
	},
	humidity: {
		marginBottom: 12,
		fontSize: '2rem',
	},
};
