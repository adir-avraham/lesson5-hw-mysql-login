import React from 'react';
import { Link } from "react-router-dom";




export default class Navbar extends React.Component<any, any> {

  render() {

    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link to="/home/">
              <span className="nav-link">Home <span className="sr-only">(current)</span></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register/">
              <span className="nav-link">Register</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login/">
              <span className="nav-link">Log in</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/change-password/">
              <span className="nav-link">Change password</span>
            </Link>
          </li>
        </ul>
    </nav>
  );
}
}