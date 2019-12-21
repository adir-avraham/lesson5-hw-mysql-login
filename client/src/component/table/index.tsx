import React from "react";

export default class OrdersTable extends React.Component<any, any> {
  
    render() {
  
        const { headers, data } = this.props;
  
        if (!Array.isArray(headers) || !Array.isArray(data))
        return <h3 className="alert alert-danger" role="alert">No data</h3>;

    return (
        <table className= "table table-bordered table-striped table-dark">
            <thead>
                <tr>
                {headers}
                </tr>
            </thead>
            <tbody>
                {data}
            </tbody>
        </table>
    );
  }
}
