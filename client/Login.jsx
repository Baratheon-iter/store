import React, { Component } from 'react';
import Wrapper from './containers/LoginContainer.jsx';


class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Wrapper />
      </div>  
    )
  }
}

export default Login;