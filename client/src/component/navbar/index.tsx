import React from 'react';
import { Link } from "react-router-dom";




export default class Navbar extends React.Component<any, any> {

  render() {

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
          <li className="nav-item">
            <Link to="/orders/">
              <span className="nav-link">Orders</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/search-customer/">
              <span className="nav-link">Customers</span>
            </Link>
          </li>
        </ul>
        </div>
    </nav>
  );
}
}