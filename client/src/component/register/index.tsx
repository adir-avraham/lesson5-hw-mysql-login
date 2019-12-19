import axios from 'axios';
import React from 'react';


const registerUrl = ('http://localhost:4000/auth/register');


export default class Register extends React.Component <any,any> {

state = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  message: "hello"
}

handleOnChange = (event: any) =>{
  const { target } = event;
  this.setState({[target.name]: target.value})
}

handleRegister = async () => {
  const result = await axios.post(registerUrl, this.state)
  const {redirect, message} = result.data
  if (redirect) {
    alert(message)
    this.props.history.push('/login')
  } else {
    this.setState( {message: message})
  }
  console.log(this.state)
}

render() {

  return (
    <div className="container">
    <div className="row justify-content-md-center">
      <div className="text-center col-lg-4">
        <form className="form-signin">
          <img className="mb-4" src="https://www.fundraisingdirectory.com.au/wp-content/uploads/2018/12/signup-new-logo-announcement.png" alt="" width="272" height="92" />
          <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
          <label htmlFor="firstName" className="sr-only">First Name </label>
          <input  
          id="fisrtName" 
          className="form-control" 
          placeholder="First name"
          name="firstName" 
          required
          onChange={this.handleOnChange}
          />
          <label htmlFor="inputLastName" className="sr-only">Last name</label>
          <input  
          id="inputLastName" 
          className="form-control" 
          placeholder="Last name"
          name="lastName" 
          required
          onChange={this.handleOnChange}
          />
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
            <span>{this.state.message}</span>
          </div>
          <button className="btn btn-lg btn-primary btn-block"
          type="button"
          onClick={this.handleRegister}
          >Register</button>
        </form>
      </div>
    </div>
  </div>
  );
}
}



