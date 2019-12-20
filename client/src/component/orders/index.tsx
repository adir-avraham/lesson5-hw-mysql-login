import React from "react";
import axios from "axios";
import OrdersTable from "../orders-table";

const ordersUrl = "http://localhost:4000/getOrders";
const shipCitiesUrl = "http://localhost:4000/getShips";
const getOrderBycityUrl = "http://localhost:4000/getOrderByCity";

export default class Orders extends React.Component<any, any> {
  state = {
    orders: [],
    shipCity: "",
    citiesList: [],
  };

  componentDidMount = async () => {
    try {
      const result = await axios.get(ordersUrl);
      const result2 = await axios.get(shipCitiesUrl)
      this.setState({ orders: result.data[0], citiesList: result2.data  });
      } catch {
      console.log("error with orders");
    }
  };

  getOrderBycity = async (shipCity: any) => {
    try {
      const result = await axios.post(getOrderBycityUrl, {shipCity});
      this.setState({ orders: result.data });
      } catch {
      console.log("error with orders");
    }    
  }

  render() {
    const { orders, citiesList } = this.state;
    if (!orders.length) return <h2>No data</h2>;
 
    const headers = getHeaders(orders);
    const data = getTableBody(orders);  
    const citiesOptions = getCitiesOptions(citiesList);

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

             {citiesOptions}
              </select>
            </div>
            <div className="col-auto my-1">
              <select
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect2"
              >
                <option >Choose...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-auto my-1">
              <button type="button" className="btn btn-primary"
              onClick={()=>{
                const { shipCity} = this.state;
                this.getOrderBycity(shipCity);

              
              }}>
                Submit
              </button>
            </div>
          </div>
        </form>
        <OrdersTable headers={headers} data={data} />
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