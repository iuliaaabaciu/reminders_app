import React from 'react';
import { Link } from 'react-router-dom';
import { getAuthToken, getUser } from "./session";

const Homepage = () => {
  if (getAuthToken()) {
    const user = getUser();
    const firstname = user.replace(/(.*firstName".")(\w+)(.*)/, '$2');

    return (
      <div>
          <h1>Welcome back {firstname}, click <Link to="/reminders" className="link">here</Link> to create your reminder</h1>
      </div>
    )
  }

  return (
    <>
      <div className="container welcome">
        <h1 className="title">Welcome, please proceed in order to create your reminder</h1>
      </div>  
      <div className="container">
        <Link to="/register" className="link">
          <button className="button">Register</button>
        </Link>
        <Link to="/login" className="link">
          <button className="button">Log In</button>
        </Link>
      </div>  
      </>
  );
}

export default Homepage;