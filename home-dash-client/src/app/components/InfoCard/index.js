import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import styles from './styles';

function InfoCard(props) {
	const { children, classes } = props;
	return (
		<Grid container item xs={4} spacing={40}>
			<Card className={classes.card}>
				{ children }
			</Card>
		</Grid>
	);
}

InfoCard.defaultProps = {
	children: <div />,
};

InfoCard.propTypes = {
	classes: PropTypes.shape({
		card: PropTypes.string,
	}).isRequired,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

export default withStyles(styles)(InfoCard);
