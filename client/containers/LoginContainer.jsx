import React from 'react'

class Login extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        return(
            <div style={{marginTop: '125px', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto'}}>
                <button onClick={() => window.location.href="http://localhost:3000/googleLogin"} style={{marginTop: '25px', padding: '5px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>Login with Google</button>
            </div>);
    }
}

export default Login;