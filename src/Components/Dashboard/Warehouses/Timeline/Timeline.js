
import './style.scss'
import React, { useState } from 'react';
function Timeline(props) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  const handleTrackShipment = () => {
    // Here you would typically make an API call to track the shipment using the tracking number
    // For demonstration purposes, let's just set a dummy result
    const dummyResult = {
      status: 'Delivered',
      location: 'New York, NY',
      deliveryDate: '2024-03-23',
      estimatedDelivery: '2024-03-22',
      details: 'Your shipment has been delivered successfully.'
    };
    setTrackingResult(dummyResult);
  };

  return (
    <div className="container">
      <h1>Courier Tracking</h1>
      <div className="tracking-form">
        <input
          type="text"
          placeholder="Enter Tracking Number"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
        />
        <button onClick={handleTrackShipment}>Track Shipment</button>
      </div>
      <div>
      <h2>Shipping Details</h2>
      {/* {JSON.stringify(props.shippingData)} */}
      <table className="shipping-table">
        <tbody>
          {Object.entries(props.shippingData).map(([key, value]) => (
            <tr key={key}>{
              key==="_id"||key==="id"?
              <></>:
              <>
              <td className="table-key">{key}</td>
              <td>{value}</td>
              </>
            }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      {/* {trackingResult && (
        <div className="tracking-result">
          <h2>Tracking Result</h2>
          <p>Status: {trackingResult.status}</p>
          <p>Location: {trackingResult.location}</p>
          <p>Delivery Date: {trackingResult.deliveryDate}</p>
          <p>Estimated Delivery: {trackingResult.estimatedDelivery}</p>
          <p>Details: {trackingResult.details}</p>
        </div>
      )} */}
    </div>
  );
}

export default Timeline;
