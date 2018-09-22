import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { INCREMENT_TARGET_TEMP, DECREMENT_TARGET_TEMP } from './constants';
import InfoCard from '../index';
import styles from './styles';
import { propTypes } from './propTypes';
import { nestActionCreators } from './ducks';

// 	{data.ambient_temperature_f}&#x2109;

export class NestInfo extends React.Component {
	constructor(props) {
		super(props);
		this.handleUpdateTargetTemp = this.handleUpdateTargetTemp.bind(this);
	}

	handleUpdateTargetTemp(ind) {
		// console.log('TCL: NestInfo -> handleUpdateTargetTemp -> ind', ind);
		const { incrementTargetTempDispatch, decrementTargetTempDispatch, updateNestStoreTargetTempDispatch, ui } = this.props;
		if (ind === INCREMENT_TARGET_TEMP) incrementTargetTempDispatch(ui.targetTemp);
		if (ind === DECREMENT_TARGET_TEMP) decrementTargetTempDispatch(ui.targetTemp);

		updateNestStoreTargetTempDispatch(ui.targetTemp);
	}

	render() {
		console.log('Props: ', this.props);
		const { classes, data, ui } = this.props;

		return (
			<InfoCard>
				<CardContent>
					<Grid container direction="column" spacing={40}>
						<Grid container className={classes.gridRow} direction="row" justify="center">
							<Grid item xs={6}><Typography className={classes.label} align="center" color="textSecondary" variant="display3">NEST</Typography></Grid>
						</Grid>
						<Grid container className={classes.gridRow} direction="row" justify="center" spacing={40}>
							<Grid item xs={4}>
								<Typography className={classes.label} color="textSecondary" variant="display1">Mode</Typography>
								<Typography className={classes.label} color="textSecondary" variant="headline">{data.hvac_mode}</Typography>
							</Grid>
							<Grid item xs={4}>
								<CardActions>
									<Button className={classes.indoorTempButton} size="small" onClick={() => this.handleUpdateTargetTemp(INCREMENT_TARGET_TEMP)}>
										<i className={[classes.indoorTempUp, 'material-icons'].join(' ')}>arrow_forward_ios</i>
									</Button>
								</CardActions>
								<CardActions>
									<Button className={classes.indoorTempButton} size="small" onClick={() => this.handleUpdateTargetTemp(DECREMENT_TARGET_TEMP)}>
										<i className={[classes.indoorTempDown, 'material-icons'].join(' ')}>arrow_forward_ios</i>
									</Button>
								</CardActions>
							</Grid>
							<Grid item xs={4}>
								<Typography className={classes.label} color="textSecondary" variant="display1">Target</Typography>
								<Typography className={classes.label} color="textSecondary" variant="headline">{ui.targetTemp}&#x2109;</Typography>
							</Grid>
						</Grid>
						<Grid container direction="row" justify="center">
							<Grid item xs={6}>
								<Typography className={classes.indoorTemp} color="textSecondary" variant="display4">{data.ambient_temperature_f}&#x2109;</Typography>
							</Grid>
						</Grid>
						<Grid container direction="row" justify="center">
							<Grid item xs={6}>
								<Typography align="center" color="textSecondary" variant="headline">Humidity</Typography>
							</Grid>
						</Grid>
						<Typography className={classes.label} color="textSecondary">{data.humidity}%</Typography>
					</Grid>

				</CardContent>
			</InfoCard>
		);
	}
}

NestInfo.propTypes = propTypes;

const mapStateToProps = (state) => {
	const { nest } = state.data;
	const device1 = Object.keys(nest)[0];

	return { data: nest[device1], ui: { targetTemp: 75 } };
};

const mapDispatchToProps = dispatch => ({
	incrementTargetTempDispatch: targetTemp => dispatch(nestActionCreators.incrementTargetTemp(targetTemp)),
	decrementTargetTempDispatch: targetTemp => dispatch(nestActionCreators.decrementTargetTemp(targetTemp)),
	updateNestStoreTargetTempDispatch: targetTemp => dispatch(nestActionCreators.updateNestStoreTargetTemp(targetTemp)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NestInfo));
