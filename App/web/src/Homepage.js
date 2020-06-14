import React from 'react';
import { Link } from 'react-router-dom';
import { getAuthToken, getUser } from "./session";

const Homepage = () => {
  if (getAuthToken()) {
    const user = getUser();
    const firstname = user.replace(/(.*firstName".")(\w+)(.*)/, '$2');

    return (
      <div className="container">
        <div className="welcome">
            <h1>Welcome back {firstname}!</h1>
            <h2>Click <Link to="/reminders" className="link">here</Link> to create your reminder</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="welcome">
        <h1 className="title">Welcome! Please proceed in order to create your reminder</h1>
        <div className="displayEvenly">
        <Link to="/register" className="link">
          <button className="button btnDisplay">Register</button>
        </Link>
        <p> or </p>
        <Link to="/login" className="link">
          <button className="button btnDisplay">Log In</button>
        </Link>
        </div>
      </div>
    </div>  
  );
}

export default Homepage;