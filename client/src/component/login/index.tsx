import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import {userLogin} from '../../redux/actions';
import React from 'react';


const logInUrl = ('http://localhost:4000/auth/login')



export class Login extends React.Component<any, any> {

  state = {
    email: "",
    password: "",
    message: "Hello",
  }

  handleOnChange = (event: any) => {
    const { target } = event;
    this.setState({ [target.name]: target.value })
  }

  handleLogin = async () => {
    const result = await axios.post(logInUrl, this.state)
    const { redirect, message, token, user } = result.data    
    this.setState({ message: message })
    if (redirect) {
      alert(message)
      this.props.userLogin(user.id, token)
      this.props.history.push('/home')
      localStorage.setItem('token', token);
    }
    if (!redirect) this.props.history.push('/login')

  }
  render() {
    const {message} = this.state
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="text-center col-lg-4">
            <form className="form-signin">
              <img className="mb-4" src="https://d1fklm6vjp0pky.cloudfront.net/wysiwyg/ves_gosmart/loginlogo-mobile.png" alt="" width="92" height="92" />
              <h1 className="h3 mb-3 font-weight-normal">Please log-in</h1>
              <label htmlFor="inputEmail" className="sr-only">Email address</label>
              <input  
              id="inputEmail" 
              className="form-control" 
              placeholder="Email address"
              name="email" 
              required
              onChange={this.handleOnChange}
              />
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              name="password"
              required
              onChange={this.handleOnChange}
              />
              <div className="checkbox mb-3">
              {message === "Hello" ? <span>{message}</span> : <span className="text-danger">{message}</span>}
              </div>
              <button className="btn btn-lg btn-primary btn-block"
              type="button"
              onClick={this.handleLogin}
              >Log in</button>
            </form>
          </div>
        </div>
      </div>

    );
  }
}


const mapDispatchToProps = (dispatch: any) => ({
    
  userLogin: (userId: any, token: any) => dispatch(userLogin(userId, token))
})

export default connect(null, mapDispatchToProps)(Login);