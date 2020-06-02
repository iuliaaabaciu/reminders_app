import React from 'react';
import { Link } from 'react-router-dom';
import { home } from './home';
import { getAuthToken, getUser } from "./session";
import Cookie from 'js-cookie';


class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading...'
    }
  }  
  async componentDidMount() {
    const msg = await home();
    this.setState({ message: msg });
  }

  render() {
    const user = getUser();
    console.log('typeof', typeof(user));
    const firstname = user.matchAll(/(\w+)/g);
    console.log('firstname', firstname);
    if (getAuthToken() === undefined) {
      return(
        <div>
        <h1>{this.state.message}</h1>
          <ul>
            <h1>Welcome, please proceede in order to create your reminder</h1>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
      )
    }
    return (
      <div>
      <h1>{user}</h1>
        <ul>
          <h1>Welcome {}, please procede in order to create your reminder</h1>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
    );
  }
}

export default Homepage;