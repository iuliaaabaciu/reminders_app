import React from 'react';
import { Link } from 'react-router-dom';
import { login } from './users';
import { setUser, setAuthToken } from "./session";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginError: '',
    }
  }

  onEmailChange = (event) => 
    this.setState({ email: event.target.value });

  onPasswordChange = (event) => 
    this.setState({ password: event.target.value });

  onLogin = async () => {
    try {
      const { user, authToken } = await login(this.state.email, this.state.password)
      setUser(user);
      setAuthToken(authToken);
      this.props.history.push('./reminders');
    } catch(e) {
      this.setState({ loginError: 'Wrong credentials, please try again' });
    }
  }

  render() {
    return (
      <>
        <div className="nav">
          <ul id="menu">
            <li><Link to="/home" className="link">Homepage</Link></li>
            <li><Link to="/register" className="link">Register</Link></li>
          </ul>
        </div>

        <div className="container">
          <div className="form">
            <h3 className="title">LogIn</h3>
            <input className="input"
              placeholder="E-mail"
              type="email" 
              value={this.state.email}
              onChange={this.onEmailChange}
            />
            <input className="input"
              placeholder="password"
              type="password"
              value={this.state.password}
              onChange={this.onPasswordChange}
            />
            <span className="error">{ this.state.loginError }</span>
            <button className="button"
              onClick={ this.onLogin }>
              Log In
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default LogIn;