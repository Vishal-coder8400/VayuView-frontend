import React from "react";
import Timeline from "./Timeline"; // Assuming you have a Timeline component
import ShipmentDetails from "./ShipmentDetails"; // Assuming you have a ShipmentDetails component
import axios from "axios";
import { getBaseURL } from "../../../../common/constant/urls";

const TrackingPage = (props) => {
  // Sample data for timeline status updates
  const timelineData = [
    { status: "Order Placed", timestamp: "2023-01-01T12:00:00" },
    { status: "Processing", timestamp: "2023-01-02T14:30:00" },
    { status: "Shipped", timestamp: "2023-01-03T10:45:00" },
    // Add more status updates as needed
  ];

  // Sample data for shipment details
  const shipmentDetails = {
    shipmentNo: "SH123456",
    lrNo: "LR789012",
    // Add more details as needed
  };
  const downloadFile = async (filename) => {
    try {
      // Replace 'filename.txt' with the actual filename you want to download
      const response = await axios.get(getBaseURL()+`/file/${filename}`, {
        responseType: 'blob' // Set responseType to 'blob' to handle binary data
      });

      // Create a link element
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);

      // Append link to the body and click it to start download
      document.body.appendChild(link);
      link.click();

      // Clean up by removing the link
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div>
      <div className="flex flex-col p-8 mt-10 bg-[#FAFAF8] h-screen">
        {/* Left Side: Timeline UI */}
        <div className="w-full pr-4 h-[40px] flex">
          <span className="font-light text-[20px] cursor-pointer flex flex-row" onClick={()=>{
             props.setActiveComponent("shipments")
          }}>{"<"}&nbsp;&nbsp; <h4>Order Id #{props.shippingData._id}</h4></span> &nbsp;&nbsp;
          {/* <Timeline data={timelineData} shippingData={props.shippingData}/> */}
        </div>
          <h1 className="font-normal text-[30px] cursor-pointer flex flex-row">Thank You</h1>
          {/* 7367f0 */}
          <div className="flex flex-row">
            <div style={{border: '1px solid #7367f0', height: 25, width: 25, borderRadius: 100, background:"#7367f0"}}>

            </div>
           
            <div style={{ height: 25, width: '25%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <div style={{ height: 3, width: '100%', background: props.shippingData.order_status==="In Transit" || props.shippingData.order_status==="Delivered"?"#7367f0":'black'}}>
                
              </div>
            </div>
            <div style={{border: '1px solid black', height: 25, width: 25, borderRadius: 100}}>

            </div>
            <div style={{ height: 25, width: '25%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <div style={{ height: 3, width: '100%', background: 'black'}}>
                
              </div>
            </div>
            <div style={{border: '1px solid black', height: 25, width: 25, borderRadius: 100}}>

            </div>
          </div>
          <h2 className="text-xl font-bold mb-4 mt-4">Shipment Details</h2>
      
          <button className="bg-indigo-500 text-white w-[240px] px-4 py-2 rounded" onClick={()=>{
            downloadFile(props.shippingData._id+".png")
          }}>
          Download Ticket Label
        </button>
        <table style={{marginTop: 10}}>
        <tbody>
          {Object.entries(props.shippingData).map(([key, value]) => (
            <tr key={key}>{
              key==="_id"||key==="id" || key==="ct"?
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
    </div>
  );
};

export default TrackingPage;
