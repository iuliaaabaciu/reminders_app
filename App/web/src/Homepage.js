import React from 'react';
import { Link } from 'react-router-dom';
import { getAuthToken, getUser } from "./session";

const Homepage = () => {
  if (getAuthToken()) {
    const user = getUser();
    const firstname = user.replace(/(.*firstName".")(\w+)(.*)/, '$2');

    return (
      <div>
        <ul>
          <h1>Welcome {firstname}, please proceede in order to create your reminder</h1>
          <li><Link to="/reminders">Reminders</Link></li>
        </ul>
      </div>
    )
  }

  return (
    <div>
      <ul>
        <h1>Welcome, please proceede in order to create your reminder</h1>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </div>
  );
}

export default Homepage;