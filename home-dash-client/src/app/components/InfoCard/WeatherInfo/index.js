import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import InfoCard from '../index';
import styles from './styles';
// import { propTypes } from './propTypes';

const WeatherInfo = (props) => {
	const { userPosition } = props;
	const { latitude, longitude } = (userPosition || {});
	console.log('userPosition: ', userPosition);
	return (
		<InfoCard>
			<CardContent>Latitude: {latitude} Longitude: {longitude}</CardContent>
		</InfoCard>
	);
};

// WeatherInfo.propTypes = propTypes;

const mapStateToProps = (state) => {
	const { meta } = state;
	console.log('meta: ', meta);
	return { userPosition: meta.position };
};

export default connect(mapStateToProps)(withStyles(styles)(WeatherInfo));
