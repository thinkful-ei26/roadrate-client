import React, {useState, useEffect} from 'react';
import ReviewForm from './review-form';


export const Dashboard = (props) => {
  const [first, setFirst] = useState("");

  useEffect(() => {
    const stuff = localStorage.getItem("user");
    setFirst(stuff) 
  })

  console.log('dashboard props: ', props)

  console.log(localStorage.user);
  return (
    <div className="dashboard">
        <div className="dashboard-greeting">
            <h2>Hello {first}!</h2>
            <p>@username</p>
        </div>

        <button onClick={() => {
          localStorage.clear()
          }
        }>
          Logout
        </button>

        <ReviewForm />
    </div>
  )
}

export default Dashboard;
