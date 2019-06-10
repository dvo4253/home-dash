import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NestInfo from '../InfoCard/NestInfo';
import WeatherInfo from '../InfoCard/WeatherInfo';

const styles = {
	wrapper: {
		padding: '3vh 2vw',
	},
	root: {
		flexGrow: 1,
	},
};

const DashboardMain = (props) => {
	const { classes } = props;
	return (
		<div className={classes.wrapper}>
			<Grid container justify="center" className={classes.root} spacing={1}>
				<NestInfo />
				<WeatherInfo />
			</Grid>
		</div>
	);
};

DashboardMain.propTypes = {
	classes: PropTypes.shape({
		root: PropTypes.string,
	}).isRequired,
};

export default withStyles(styles)(DashboardMain);
