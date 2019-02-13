import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import Plate from './plate';

export class Dashboard extends React.Component {
    // componentDidMount() {
    //     this.props.dispatch(fetchProtectedData());
    // }

    render() {
        console.log('this.props on Dashboard: ', this.props)
        return (
            <div className="dashboard">
                <div className="dashboard-greeting">
                    <h2>Hello {this.props.name}!</h2>
                    <p>@{this.props.username}</p>
                </div>
                {/* <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
                </div> */}
                < Plate />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { username, name } = state.auth.currentUser;
    return {
        username,
        name,
        protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
