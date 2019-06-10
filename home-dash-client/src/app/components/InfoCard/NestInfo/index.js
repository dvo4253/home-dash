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
const checkTargetTempUpdateSuccess = (target = {}) => target.successToggle;
class NestInfo extends React.Component {
	constructor(props) {
		super(props);
		this.handleUpdateTargetTemp = this.handleUpdateTargetTemp.bind(this);
	}

	handleUpdateTargetTemp(ind) {
		const {
			incrementTargetTempDispatch, decrementTargetTempDispatch, ui,
		} = this.props;

		const { target } = ui;

		if (ind === INCREMENT_TARGET_TEMP) incrementTargetTempDispatch(target.temperature);
		if (ind === DECREMENT_TARGET_TEMP) decrementTargetTempDispatch(target.temperature);
	}

	render() {
		const { classes, data, ui } = this.props;
		const targetSuccessClass = checkTargetTempUpdateSuccess(ui.target) ? 'success' : classes.transition;


		return (
			<InfoCard>
				<CardContent>
					<Grid container spacing={1} direction="column">
						<Grid container spacing={1} className={classes.gridRow} direction="row" justify="center">
							<Grid className={classes.title} item xs={12}>
								<Typography className={classes.label} align="center" color="textSecondary" variant="h1">NEST</Typography>
							</Grid>
						</Grid>
						<Grid container spacing={1} className={classes.gridRow} direction="row" justify="center">
							<Grid container direction="column" item xs={4}>
								<Grid className={classes.label} item>
									<Typography variant="h2" className={classes.label} color="textSecondary">Mode</Typography>
								</Grid>
								<Grid className={classes.label} item>
									<Typography className={classes.label} color="textSecondary">{data.hvac_mode}</Typography>
								</Grid>
							</Grid>
							<Grid container direction="column" item xs={4}>
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
							<Grid container directon="column" item xs={4} className={`${classes.target} ${targetSuccessClass}`}>
								<Grid className={classes.label} item>
									<Typography variant="h2" className={classes.label} color="textSecondary">Target</Typography>
								</Grid>
								<Grid className={classes.label} item>
									<Typography className={classes.label} color="textSecondary">{ui.target.temperature}&#x2109;</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid container direction="row" item xs={12} justify="center">
							<Grid container direction="column" item xs={6} justify="center">
								<Grid className={classes.label} item>
									<Typography className={classes.label} color="textSecondary">Humidity</Typography>
								</Grid>
								<Grid className={classes.label} item>
									<Typography variant="h2" className={classes.humidity} color="textSecondary">{data.humidity}%</Typography>
								</Grid>
							</Grid>
							<Grid className={classes.label} item xs={6}>
								<Typography className={classes.indoorTemp} color="textSecondary">{data.ambient_temperature_f}&#x2109;</Typography>
							</Grid>
						</Grid>

					</Grid>

				</CardContent>
			</InfoCard>
		);
	}
}

NestInfo.propTypes = propTypes;

const mapStateToProps = (state) => {
	const nestData = state.data.nest;
	const nestUI = state.ui.nest;
	const device1 = Object.keys(nestData)[0];

	return { data: nestData[device1], ui: nestUI };
};

const mapDispatchToProps = dispatch => ({
	incrementTargetTempDispatch: targetTemp => dispatch(nestActionCreators
		.incrementTargetTemp(targetTemp)),
	decrementTargetTempDispatch: targetTemp => dispatch(nestActionCreators
		.decrementTargetTemp(targetTemp)),
	// updateNestStoreTargetTempDispatch: targetTemp => dispatch
	// (nestActionCreators.updateNestStoreTargetTemp(targetTemp)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NestInfo));
