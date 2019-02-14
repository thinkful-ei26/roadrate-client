import React, {useState} from 'react';

export const Dashboard = (props) => {
   const [ authToken, setAuthToken ] = useState({ authToken: null });

  // onclick() {
  //   setAuthToken(null)
  // }

  return (
    <div className="dashboard">
        <div className="dashboard-greeting">
            <h2>{props.username}'s Dashboard</h2>
            <p>{localStorage.getItem(props.user)}</p>
        </div>

        <button onClick={() => setAuthToken(authToken)}>
          Click Me
        </button>
        {/* <div className="dashboard-protected-data">
            Protected data: {this.props.protectedData}
        </div> */}
    </div>
  )
}

console.log('local s:', localStorage)

export default Dashboard;
