import React from 'react';
import { Link } from 'react-router-dom';
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
      <>
        <div className="nav">
          <ul id="menu">
            <li><Link to="/home" className="link">Homepage</Link></li>
            <li><Link to="/login" className="link">Login</Link></li>
          </ul>
        </div>
        
        <div className="container">
        <div className="form">
          <h3 className="title">Please create an account</h3>
          <input className="input" 
            name="firstName" 
            placeholder="First name" 
            value={ this.state.firstName } 
            onChange={ this.onFirstNameChange }
          />
          <input className="input" 
            name="lastName" 
            placeholder="Last name" 
            value={ this.state.lastName } 
            onChange={ this.onLastNameChange }
          />
          <input className="input" 
            name="email" 
            placeholder="Email" 
            value={ this.state.email } 
            onChange={ this.onEmailChange } 
          />
          <input className="input" 
            name="password" 
            placeholder="Password" 
            type="password" 
            value={this.state.password} 
            onChange={ this.onPasswordChange }
          />
          
          <button className="button" 
            onClick={ this.register }>
            Register
          </button>
          </div>
        </div>
      </>
    )
  }
}

export default Register;
