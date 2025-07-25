import React, { useState } from "react";
import "./style.scss";
import { stateConnected } from "../../../utils/redux_tools";
import { callApi } from "../../../utils/api";
import qr from './qrCode.png'

function BankModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
       <button onClick={openModal} className="wallet-open-button">Open Modal</button>
      {isOpen && (
        <div className="wallet-modal">
          <div className="wallet-modal-content">
            <span className="wallet-close" onClick={closeModal}>&times;</span>
            <h2 className="wallet-modal-title">Bank Details</h2>
            <p>Bank Name: XYZ Bank</p>
            <p>Account Number: 123456789</p>
            <p>Branch: ABC Branch</p>
            {/* Add more details here */}
          </div>
        </div>
      )}
    </div>
  );
}

function Wallet(props) {
  const [transactionData, setTransactionData] = React.useState([])
  React.useEffect(()=>{
    (async () => {
      await callApi({
        endpoint: "api/transaction",
      })
        .then((res) => {
          setTransactionData(res.data)
        })
        .catch((err) => {});
    })();
  }, [])
  return (
    <div className="wallet--app bg-[#FAFAF8] h-screen">
      <div>
        <div className="wallet-section-option bg-white">
          <p>Total Balance</p>
          <h1> ₹ {transactionData?.[0]?.wallet_balance?transactionData[0].wallet_balance:"0"}</h1>
          {/* <div className="wallet-section-buttons">
            <BankModal/>
            <button className="green">Add Money</button>
            {/* <button className="outline">Statement</button> 
        </div> */}
        </div>
        <div className="wallet-transaction-wrapper bg-white ">
          <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Recent Transactions</h3>
          <table className="wallet--transaction-table">
    <thead>
      <tr>
        <th>Type</th>
        <th>Amount</th>
        <th>Description</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {transactionData.length === 0 && <>
     No Records
      </>}


      {transactionData.length !== 0 && <>
     {
      transactionData.map(tD=>{
        return <>
        <tr>
        <td>{tD.type}</td>
        <td>{tD.amount}</td>
        <td>{tD.description}</td>
        <td>{tD.ct}</td>
      </tr>
        </>
      })
     }
      </>}
    </tbody>
  </table>
        </div>
      </div>
      {/* <div className="delivery-section">
        <div className="deliveries-table">
          <div className="deliveries-table-header">
            <div>
              <h4>Recent Transactions</h4>
            </div>
            <div>
              <h5>See All {">"}</h5>
            </div>
          </div>
        </div>
        <div className="deliveries-daily-plan"></div>
      </div> */}
<div className="wallet--add-money-section">
  <h2>How to Add Money to Your Wallet</h2>
  <h2>Payment Options:</h2>

  Bank Details<br/><br/>
  Bank Name : KOTAK MAHINDRA BANK LIMITED, CONNAUGHT PLACE DELHI<br/>
Bank Account No. : 6648380290<br/>
Bank IFSC code : KKBK0004605<br/>
Account holder's name : MVCUBE Vayuguard AQI PVT LTD<br/><br/>
QR Code:<br/>
<img height={300} width={300} src={qr}></img>
  <ol className="wallet--steps">
    <li>
      <div className="step-box">1</div>
      Enter Points for Transaction
    </li>
   
  </ol>
</div>

    </div>
  );
}

export default stateConnected(Wallet);
