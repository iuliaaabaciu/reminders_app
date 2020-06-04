import React from 'react';
import { deleteUser, deleteAuthToken } from "./session";
import { Route , withRouter} from 'react-router-dom';

const LogOut = (props) => {

  const logout = () => {
    deleteUser();
    deleteAuthToken();
    props.history.push('/login');
  }

  return (
    <button onClick={logout}>Log Out</button>
  )
}

export default LogOut;