import React from "react";

const ShipmentDetails = ({ details }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Shipment Details</h2>
      <div className="mb-4">
        <p>
          <span className="font-semibold">Shipment No:</span> {details.shipmentNo}
        </p>
        <p>
          <span className="font-semibold">LR No:</span> {details.lrNo}
        </p>
        {/* Add more details as needed */}
      </div>
      <div>
        {/* Add buttons for actions like Download Ticket Label */}
        <button className="bg-indigo-500 text-white px-4 py-2 rounded">
          Download Ticket Label
        </button>
      </div>
    </div>
  );
};

export default ShipmentDetails;
