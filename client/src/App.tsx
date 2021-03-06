import React from 'react';
import 'bootstrap/dist/js/bootstrap.min.js';	
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import Navbar from './component/navbar';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from './component/register';
import Login from './component/login';
import HomePage from './component/home';
import ChangePassword from './component/change-password';
import Orders from './component/orders';
import SearchCustomer from './component/search-customer';


const App: React.FC = () => {
  return (
    <div>


      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route path="/home" component={HomePage} />      
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />      
          <Route path="/change-password" component={ChangePassword} />      
          <Route path="/orders" component={Orders} /> 
          <Route path="/search-customer" component={SearchCustomer} /> 
          <Route path="**" component={Register} />
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;