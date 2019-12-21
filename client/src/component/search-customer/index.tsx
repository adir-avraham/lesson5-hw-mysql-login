import React from "react";
import axios from "axios";
import Table from '../table';
import mainAxios from '../../axios/maimAxios';

const getCustomerUrl = "http://localhost:4000/getCustomer";

export default class SearchCustomer extends React.Component<any, any> {
  state = {
    first_name: "",
    last_name: "",
    customersResulrt: []
  };

  componentDidMount = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) return this.props.history.push('/login');
    
    try{

      const result = await mainAxios.post("/getCustomer");
      console.log("ressssssss"  + JSON.stringify(result.data))
      
      const { redirect } = result.data
      console.log(redirect)
      if (!redirect) {
        return this.props.history.push('/login');
      }
      
    } catch {
      console.log("some error")
      return this.props.history.push('/login');
    }
  }

  handleChange = (event: any) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSearch = async () => {
    const { first_name, last_name } = this.state;
    const result = await mainAxios.post("/getCustomer", { first_name, last_name });
    const {customer, redirect} = result.data;
    if (redirect) this.setState({ customersResulrt: customer });
    if (!redirect) this.props.history.push('/login');
  };

  render() {
    const {customersResulrt} = this.state
    const headers = getHeaders(customersResulrt);
    const data = getTableBody(customersResulrt);  
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="text-left col-lg-4">
            <form className="form-signin">
              <div className="text-center mb-4">
                <img
                  className="mb-4 mt-5"
                  src="https://www.esalon.nz/wp-content/uploads/2017/07/customer-search.jpg"
                  alt="pic"
                  width="142"
                  height="122"
                />
                <p>Hello</p>
                {/* <p>{this.state.resultMessage}</p> */}
              </div>
              <div className="form-label-group">
                <label htmlFor="inputFirstName">First name</label>
                <input
                  type="text"
                  id="inputFirstName"
                  className="form-control"
                  placeholder="First name"
                  required
                  name="first_name"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-label-group mt-2">
                <label htmlFor="inputLastName">Last name</label>
                <input
                  type="text"
                  id="inputLastName"
                  className="form-control"
                  placeholder="Last name"
                  required
                  name="last_name"
                  onChange={this.handleChange}
                />
              </div>

              <button
                className="btn btn-lg btn-primary btn-block my-3"
                type="button"
                onClick={this.handleSearch}
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <Table headers={headers} data={data} />
      </div>
    );
  }
}


function getHeaders(data: any) {
  if (!data.length) return;
  const [firstItemInArray] = data;
  return Object.keys(firstItemInArray).map((header: any, index: number) => (
    <th key={"th_" + index} scope="col">
      {header}
    </th>
  ));
}

function getTableBody(data: any) {
  return data.map((dataItem: any, index: number) => {
    return <tr key={"tr_" + index}>{getTableRow(dataItem)}</tr>;
  });
}

function getTableRow(row: any) {
  return Object.entries(row).map(([key, value], index) => {
    return <td key={"td_" + index}> {value}</td>;
  });
}