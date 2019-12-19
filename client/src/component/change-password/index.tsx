import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';






const changePasswordUrl = ('http://localhost:4000/auth/changePassword')


export class ChangePassword extends React.Component<any, any> {
    state = {
        newPassword: "",
        passwordConfirm: "",
        message: "Hello",
    }
    
    componentDidMount = async () => {
      const { token, userId }  = this.props.currentUser
      
        console.log(token)
        console.log(userId)

        //if (Object.keys(this.props.currentUser).length === 0) return this.props.history.push('/login');
        
        const headers = {
          'content-type': 'application/json',
          'authorization': '111111111-test-1111111111-test-11111111111111111111'
        } 
        const result = await axios.post(changePasswordUrl ,{headers: headers});
        console.log("result=>" + result)
        
    }
    
    handleOnChange = (event: any) => {
        const { target } = event;
        this.setState({ [target.name]: target.value })
    }
    
    handleChangePassword = async () => {
        console.log(this.state)
        const result = await axios.post(changePasswordUrl, this.state)
        const { redirect, message } = result.data
        this.setState({ message: message })
        if (redirect) {
            alert(message)
            this.props.history.push('/home')
        }
    if (!redirect) this.props.history.push('/change-password')
    
}
render() {
    const {message} = this.state
    return (
        <div className="container">
        <div className="row justify-content-md-center">
          <div className="text-center col-lg-4">
            <form className="form-signin">
              <img className="mb-4" src="http://www.mvc.edu/images/icon_passwordchange.png" alt="" width="92" height="92" />
              <h1 className="h3 mb-3 font-weight-normal">Change password</h1>
              <label htmlFor="inputNewPassword" className="sr-only">New password</label>
              <input  
              id="inputNewPassword" 
              className="form-control" 
              placeholder="New password"
              name="newPassword" 
              required
              onChange={this.handleOnChange}
              />
              <label htmlFor="inputPasswordConfirm" className="sr-only">Verify password</label>
              <input type="password"
              id="inputPasswordConfirm"
              className="form-control"
              placeholder="Verify password"
              name="passwordConfirm"
              required
              onChange={this.handleOnChange}
              />
              <div className="checkbox mb-3">
              {message === "Hello" ? <span>{message}</span> : <span className="text-danger">{message}</span>}
              </div>
              <button className="btn btn-lg btn-primary btn-block"
              type="button"
              onClick={this.handleChangePassword}
              >Save new password</button>
            </form>
          </div>
        </div>
      </div>

    );
  }
}


const mapStateToProps = (state: any) => {
    const { currentUser } = state           
    return { currentUser};
}

export default connect(mapStateToProps, null)(ChangePassword);