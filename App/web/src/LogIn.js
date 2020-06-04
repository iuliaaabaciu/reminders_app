import React from 'react';
import { login } from './users';
import { setUser, setAuthToken } from "./session";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  onEmailChange = (event) => 
    this.setState({ email: event.target.value });

  onPasswordChange = (event) => 
    this.setState({ password: event.target.value });

  onLogin = async (event) => {
    try {
      const { user, authToken } = await login(this.state.email, this.state.password)
      setUser(user);
      setAuthToken(authToken);
      this.props.history.push('./reminders');
    } catch(e) {
      alert('Invalid credentials, please try again');
    }
  }

  render() {
    return (
      <div>
        <h1>LogIn</h1>
        <input type="email" 
          value={this.state.email}
          onChange={this.onEmailChange}
        />
        <input type="password"
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <button onClick={ this.onLogin }>Log In</button>
      </div>
    )
  }
}

export default LogIn;