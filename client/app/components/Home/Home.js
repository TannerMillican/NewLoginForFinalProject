import React, { Component } from 'react';
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from "../../utils/storage";
import {Grid} from '@material-ui/core';
import Content from '../Content';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signUpUserName: '',
      singUpPassword: '',
      signUpEmail: '',
      signInUserName: '',
      singInPassword: '',
      signInEmail: '',
      signedUp: true,
    };

    this.onTextBoxChangeSignUpEmail = this.onTextBoxChangeSignUpEmail.bind(this);
    this.onTextBoxChangeSignUpUserName = this.onTextBoxChangeSignUpUserName.bind(this);
    this.onTextBoxChangeSignUpPassword = this.onTextBoxChangeSignUpPassword.bind(this);
    this.onSignUp = this.onSignUp.bind(this);

    this.onTextBoxChangeSignInEmail = this.onTextBoxChangeSignInEmail.bind(this);
    this.onTextBoxChangeSignInUserName = this.onTextBoxChangeSignInUserName.bind(this);
    this.onTextBoxChangeSignInPassword = this.onTextBoxChangeSignInPassword.bind(this);
    this.onSignIn = this.onSignIn.bind(this);

    this.onNewSignUp = this.onNewSignUp.bind(this);

    this.onLogOut = this.onLogOut.bind(this);
  }

  componentDidMount() {

    const obj = getFromStorage('the_main_app');
    console.log(obj);

    if (obj && obj.token) {
      const { token } = obj.token;

      fetch('/api/account/verify?token=' + token)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            token,
            isLoading: false
          })
        } else {
          this.setState({
            isLoading: false
          })
        }
      });
    } else {
      this.setState({
        isLoading: false
      })
    }
  }

  onTextBoxChangeSignUpUserName(event) {
    this.setState({
        signUpUserName: event.target.value
    })
  };

  onTextBoxChangeSignUpPassword(event) {
    this.setState({
        signUpPassword: event.target.value
    })
  };

  onTextBoxChangeSignUpEmail(event) {
    this.setState({
        signUpEmail: event.target.value
    })
  };

  onSignUp() {
    const {
        signUpUserName,
        signUpPassword,
        signUpEmail,
        token
    } = this.state;

    fetch('/api/account/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
            userName: signUpUserName,
            password: signUpPassword,
            email: signUpEmail
        })
    }).then(res => res.json(res))
        .then(json => {
            this.setState({
                signUpError: json.message
            });
        });
  };

  onTextBoxChangeSignInUserName(event) {
    this.setState({
        signInUserName: event.target.value
    })
  };

  onTextBoxChangeSignInPassword(event) {
    this.setState({
        signInPassword: event.target.value
    })
  };

  onTextBoxChangeSignInEmail(event) {
    this.setState({
        signInEmail: event.target.value
    })
  };

  onSignIn() {
    const {
        signInUserName,
        signInPassword,
        signInEmail,
        token
    } = this.state;

    console.log(signInUserName)
    console.log(signInPassword)
    console.log(signInEmail)

    // fetch('/api/account/signin', {
    //     method: 'POST',
    //     headers: {
    //       'Content-type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         userName: signInUserName,
    //         password: signInPassword,
    //         email: signInEmail,
    //     })
    // })

    fetch('/api/account/signin?userName=' + signInUserName + '&password=' + signInPassword + '&email=' + signInEmail)
    .then(res => res.json(res))
        .then(json => {
            // this.setState({
            //     signInError: json.message
            // });
            if (json.success) {
              setInStorage('the_main_app', { token: json.token })
              this.setState({
                signInError: json.message,
                isLoading: false,
                signInPassword: '',
                signInUserName: '',
                signInEmail: '',
                token: json.token
              })
            } else {
              this.setState({
                signInError: json.message,
                isLoading: false,
              })
            }
        });
  };

  onNewSignUp() {
    this.setState({
      signedUp: false
    })
  }

  onLogOut() {
    this.setState({
      isLoading: true
    })
    const obj = getFromStorage('the_main_app');
    console.log(obj);

    if (obj && obj.token) {
      const { token } = obj.token;

      fetch('/api/account/logout?token=' + token)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            token: '',
            isLoading: false
          })
        } else {
          this.setState({
            isLoading: false
          })
        }
      });
    } else {
      this.setState({
        isLoading: false
      })
    }
  }

  render() {

    const {
      isLoading,
      token,
      signUpError,
      signInError,
      signUpUserName,
      signUpPassword,
      signUpEmail,
      signInUserName,
      signInPassword,
      signInEmail,
      signedUp
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>)
    }

    if (!token && signedUp) {
      return ( 
        <div>
          {
            (signInError) ? (
            <p>{signInError}</p>
            ) : (null)
          }
          <p>Sign In</p>
          <input type="text" placeholder="User Name" value={signInUserName} onChange={this.onTextBoxChangeSignInUserName}/>
          <br />
          <input type="password" placeholder="Password" value={signInPassword} onChange={this.onTextBoxChangeSignInPassword}/>
          <br />
          <input type="email" placeholder="Email" value={signInEmail} onChange={this.onTextBoxChangeSignInEmail}/>
          <br />
          <button onClick={this.onSignIn}>Sign In</button>
          <br />
          <p>Don't have an account yet?</p>
          <button onClick={this.onNewSignUp}>Sign Up</button>
        </div>
      )
    }

    if (!signedUp) {
      return (
        <div>
          {
            (signUpError) ? (
            <p>{signUpError}</p>
            ) : (null)
          }
          <p>Sign Up</p>
          <input type="text" placeholder="User Name" value={signUpUserName} onChange={this.onTextBoxChangeSignUpUserName}/>
          <br />
          <input type="password" placeholder="Password" value={signUpPassword} onChange={this.onTextBoxChangeSignUpPassword}/>
          <br />
          <input type="email" placeholder="Email" value={signUpEmail} onChange={this.onTextBoxChangeSignUpEmail}/>
          <br />
          <button onClick={this.onSignUp}>Sign Up</button>
        </div>
      )
    }

    if (token && signedUp) {
      return (
        <header>
          <button onClick={this.onLogOut}>Log Out</button>
          <Grid container direction="column">
					  <Grid item container>
						  <Grid items xs={false} sm={2} />
						  <Grid item xs={12} sm={8} />
					  </Grid>
					  <Content />
					  <Grid item xs={false} sm={2} />
				  </Grid>
        </header>
      )
    }

  }
}

export default Home;
