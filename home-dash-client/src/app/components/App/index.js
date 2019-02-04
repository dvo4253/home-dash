import * as React from 'react';
import { connect } from 'react-redux';
import DashboardMain from '../DashboardMain';
import { getLocation } from './ducks';
import propTypes from './propTypes';

class App extends React.Component {
	componentDidMount() {
		const { getLocationDispatch } = this.props;
		getLocationDispatch();
	}

	render() {
		return (
			<div>
				<DashboardMain />
			</div>

		);
	}
}

App.propTypes = propTypes;

const mapDispatchToProps = dispatch => ({
	getLocationDispatch: position => dispatch(getLocation(position)),
});

export default connect(() => ({}), mapDispatchToProps)(App);
