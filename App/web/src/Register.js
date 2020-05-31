import React from 'react';
import { register } from './users';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }

  onFirstNameChange = (event) => 
    this.setState({ firstName: event.target.value });


  onLastNameChange = (event) => 
    this.setState({ lastName: event.target.value });

  onEmailChange = (event) => 
    this.setState({ email: event.target.value });

  onPasswordChange = (event) => 
    this.setState({ password: event.target.value });

  register = async () => {
    await register(this.state.firstName, this.state.lastName, this.state.email, this.state.password);
    this.props.history.push('/login');
  }
  render() {
    return (
      <div>
        <h1>Register</h1>
        <input name="firstName" value={ this.state.firstName } onChange={ this.onFirstNameChange } />
        <input name="lastName" value={ this.state.lastName } onChange={ this.onLastNameChange } />
        <input name="email" value={ this.state.email } onChange={ this.onEmailChange } />
        <input name="password" type="password" value={this.state.password} onChange={ this.onPasswordChange } />
        <button onClick={ this.register }>Register</button>
      </div>
    )
  }
}

export default Register;
