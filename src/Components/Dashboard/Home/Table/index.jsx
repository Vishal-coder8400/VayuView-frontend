import React from "react";
import "./style.scss";

const Table = ({data}) => {
  
  function getColorBasedOnTime(totalTime) {
    if (parseFloat(totalTime) >= 4) {
      return "rgba(255, 0, 0, 0.4)";
    } else if (parseFloat(totalTime) >= 2) {
      return "rgba(255, 166, 0, 0.4)";
    } else {
      return "rgba(0, 255, 0, 0.4)";
    }
  }
  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>Destination</th>
          <th>Total Shipments</th>
          {/* <th>Shipment Id</th>
          <th>Arrived</th>
          <th>Time</th> */}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row._id}</td>
            <td>{row.count}</td>
            {/* <td>{row.shipment_id}</td>
            <td>{row.arrived}</td>
            <td>
              <div
                style={{
                  width: "100%",
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <div 
                style={{
                  width: "50px",
                  borderRadius: '50px',
                  paddingLeft: '2px',
                  paddingRight: '2px',
                  backgroundColor: getColorBasedOnTime(row.total_time),
                }}>
                {row.total_time} hr
                </div>
              </div>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
