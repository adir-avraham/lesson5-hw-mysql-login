import React from "react";
import axios from "axios";
import Table from "../table";
import mainAxios from '../../axios/maimAxios';

const getOrderBycityUrl = "http://localhost:4000/getOrderByCity";



export default class Orders extends React.Component<any, any> {

  state = {
    orders: [],
    shipCity: "",
    paymentType: "",
    citiesList: [],
    paymentTypesList: []
  };


  componentDidMount = async () => {
    const token = localStorage.getItem('token');
    if (!token) return this.props.history.push('/login');
    
    try {
      const result = await mainAxios.post("/getOrders");
      const result2 = await mainAxios.post("/getShips");
      const result3 = await mainAxios.post("/getPaymentTypes");  
      if (!result.data.redirect || !result2.data.redirect || !result3.data.redirect ) {
        return this.props.history.push('/login');
      }
      this.setState({ orders: result.data.orders[0], citiesList: result2.data.shipCities, paymentTypesList: result3.data.paymentTypes });
      } catch {
      console.log("error with orders");
    }
  };

  getOrderBycity = async (shipCity: any, paymentType: any) => {
    try {
      const result = await mainAxios.post(getOrderBycityUrl, {shipCity, paymentType});
      const {redirect, filteredData} = result.data;
      if (!redirect) {
        return this.props.history.push('/login');
      }
      if (filteredData) this.setState({ orders: filteredData });
      } catch {
      console.log("error with orders");
    }    
  }


  render() {
    
    const { orders, citiesList, paymentTypesList } = this.state;
    //if (!orders.length) return <h2>No data</h2>;
    const headers = getHeaders(orders);
    const data = getTableBody(orders);  
    const citiesOptions = getCitiesOptions(citiesList);
    const paymentTypeOptions = getpaymentTypeOptions(paymentTypesList);
    
    return (
      <div>
        <h1>Orders table</h1>
        <form>
          <div className="form-row align-items-center">
            <div className="col-auto my-1">
              <select
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect1"
                onChange={(e)=>{
                  const {value} = e.target
                  this.setState({shipCity: value})
                }}
              > 
            <option value="all">All cities..</option>
             {citiesOptions}
              </select>
            </div>
            <div className="col-auto my-1">
              <select
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect2"
                onChange={(e)=>{
                  const {value} = e.target
                  this.setState({paymentType: value})
                }}
              >
                <option value="all">All pyment type..</option>
              {paymentTypeOptions}
              </select>
            </div>
            <div className="col-auto my-1">
              <button type="button" className="btn btn-primary"
              onClick={()=>{
                const { shipCity, paymentType} = this.state;
                if (!shipCity && !paymentType) return;
                this.getOrderBycity(shipCity, paymentType);
              }}>
                Submit
              </button>
            </div>
          </div>
        </form>
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
    if (key === "shipping_fee")
      return <td key={"td_" + index}> &#xFF04; {value}</td>;
    if (key === "ship_country_region" && value === "USA")
      return (
        <td key={"td_" + index}>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png"
            width="35px"
            alt="pic"
          />
        </td>
      );
    if (key === "payment_type" && value === "Credit Card")
      return (
        <td key={"td_" + index}>
          <span role="img">💳</span>
          {value}
        </td>
      );
    if (key === "payment_type" && value === "Cash")
      return (
        <td key={"td_" + index}>
          {" "}
          <span role="img">💰</span>
          {value}
        </td>
      );
    if (key === "payment_type" && value === "Check")
      return (
        <td key={"td_" + index}>
          {" "}
          <span role="img">📝</span>
          {value}
        </td>
      );
    return <td key={"td_" + index}> {value}</td>;
  });
}


function getCitiesOptions(shipCities: any) {
  const citiesOptions = shipCities.map((order:any, index: number) => <option key={`city_${index}`} value={order.ship_city}> {order.ship_city} </option>) 
  return citiesOptions;
}

function getpaymentTypeOptions(paymentTypes: any) {
  const paymentsOptions = paymentTypes.map((order:any, index: number) => <option key={`payment_${index}`} value={order.payment_type}> {order.payment_type} </option>) 
  return paymentsOptions;
}