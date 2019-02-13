import React, {useState} from 'react';

export const Dashboard = () => {
   const [ authToken, setAuthToken ] = useState("");

  // onclick() {
  //   setAuthToken(null)
  // }

  return (
    <div className="dashboard">
        <div className="dashboard-greeting">
            <h2>Hello You!</h2>
            <p>@username</p>
        </div>

        <button onClick={() => setAuthToken('null')}>
          Click Me
        </button>
        {/* <div className="dashboard-protected-data">
            Protected data: {this.props.protectedData}
        </div> */}
    </div>
  )
}

export default Dashboard;
