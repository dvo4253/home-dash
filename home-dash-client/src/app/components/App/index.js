import * as React from 'react';
import { Provider, connect } from 'react-redux';
import DashboardMain from '../DashboardMain';
import { getLocation } from './ducks';
import propTypes from './propTypes';

class App extends React.Component {
	componentDidMount() {
		const { getLocationDispatch } = this.props;
		getLocationDispatch();
	}

	render() {
		const { store } = this.props;

		return (
			<Provider store={store}>
				<div>
					<DashboardMain />
				</div>
			</Provider>
		);
	}
}

App.propTypes = propTypes;

const mapDispatchToProps = dispatch => ({
	getLocationDispatch: position => dispatch(getLocation(position)),
});

export default connect(()=> ({}), mapDispatchToProps)(App);
