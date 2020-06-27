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
      password: '',
      emailError: '',
      passwordError: '',
    };
  }

  onFirstNameChange = (event) => {
    this.setState({ firstName: event.target.value });
  };

  onLastNameChange = (event) => 
    this.setState({ lastName: event.target.value });

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }
 
  onPasswordChange = (event) => 
    this.setState({ password: event.target.value });

  validateEmail = (email) => {
    const regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (regex.test(email) === false) {
      return (this.setState({ emailError: 'Invalid email address' }));
    }
    
    return email;
  }

  validatePassword = (pass) => {
    const regex = /^(\w+){5,}$/;
    if (regex.test(pass) === false) {
      return (this.setState({ passwordError: 'Password must be at least 5 characters long.' }));
    }
    return pass;
  }

  register = async () => {
    try {
      const validatedEmail = this.validateEmail(this.state.email);
      const validatedPassword = this.validatePassword(this.state.password);
      await register(this.state.firstName, this.state.lastName, validatedEmail, validatedPassword);
      this.props.history.push('/login');
    } catch (e) {
      console.log();
    }
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
            type="email"
            placeholder="E-mail"
            value={ this.state.email } 
            onChange={ this.onEmailChange } 
          />
          <span className="error">{ this.state.emailError }</span>
          <input className="input" 
            name="password" 
            placeholder="Password" 
            type="password" 
            value={this.state.password} 
            onChange={ this.onPasswordChange }
          />
          <span className="error">{ this.state.passwordError }</span>
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
