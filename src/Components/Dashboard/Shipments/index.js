import React, { useRef, useState } from "react";
import Table from "../../../common/core/Table";
import { Button } from "../../../common/core/Button";
import { FaDownload, FaIcons } from "react-icons/fa";
import NoRecords from "../../../common/core/NoRecords";
import { create, first, isEmpty, last } from "lodash";
import Modal from "../../../common/Modal";

function Shipments() {
  const data = [
    {
      oid: 'S1',
      company_id: 'C1',
      user_id: 'U1',
      warehouse_name: 'W1',
      product_description: 'Electronics',
      shipment_weight: 10,
      fragile: 'No',
      reference_id: 'R1',
      boxes: ['Box 1', 'Box 2'],
      chargeable_weight: 15,
      consignee_name: 'Customer A',
      consignee_city: 'City X',
      consignee_state: 'State Y',
      consignee_country: 'Country Z',
      order_id: 'Order123',
      dimensions_measure: '50x30x20 cm',
      boxes_ids: 'Box 1, Box 2',
      cgst: 'CGST123',
      invoice_no: 'Inv001',
      invoice_amount: 1000,
      invoice_document_id: 'Doc123',
      payment_mode: 'Prepaid',
      cod_amount: 'COD123',
      eway_bill_no: 'E-Way Bill123',
      eway_bill_document_id: 'E-Way Doc123',
      bulk_order: 'No',
    },
    {
      oid: 'S2',
      company_id: 'C2',
      user_id: 'U2',
      warehouse_name: 'W2',
      product_description: 'Clothing',
      shipment_weight: 5,
      fragile: 'Yes',
      reference_id: 'R2',
      boxes: ['Box 3'],
      chargeable_weight: 8,
      consignee_name: 'Customer B',
      consignee_city: 'City D',
      consignee_state: 'State E',
      consignee_country: 'Country F',
      order_id: 'Order456',
      dimensions_measure: '40x20x10 cm',
      boxes_ids: 'Box 3',
      cgst: 'CGST456',
      invoice_no: 'Inv002',
      invoice_amount: 800,
      invoice_document_id: 'Doc456',
      payment_mode: 'Prepaid',
      cod_amount: 'COD456',
      eway_bill_no: 'E-Way Bill456',
      eway_bill_document_id: 'E-Way Doc456',
      bulk_order: 'Yes',
    },
    {
      oid: 'S3',
      company_id: 'C1',
      user_id: 'U3',
      warehouse_name: 'W1',
      product_description: 'Books',
      shipment_weight: 7,
      fragile: 'No',
      reference_id: 'R3',
      boxes: ['Box 4', 'Box 5'],
      chargeable_weight: 12,
      consignee_name: 'Customer C',
      consignee_city: 'City Y',
      consignee_state: 'State Z',
      consignee_country: 'Country X',
      order_id: 'Order789',
      dimensions_measure: '60x40x15 cm',
      boxes_ids: 'Box 4, Box 5',
      cgst: 'CGST789',
      invoice_no: 'Inv003',
      invoice_amount: 1200,
      invoice_document_id: 'Doc789',
      payment_mode: 'COD',
      cod_amount: 'COD789',
      eway_bill_no: 'E-Way Bill789',
      eway_bill_document_id: 'E-Way Doc789',
      bulk_order: 'No',
    },
    {
      oid: 'S4',
      company_id: 'C2',
      user_id: 'U4',
      warehouse_name: 'W2',
      product_description: 'Furniture',
      shipment_weight: 15,
      fragile: 'No',
      reference_id: 'R4',
      boxes: ['Box 6'],
      chargeable_weight: 18,
      consignee_name: 'Customer D',
      consignee_city: 'City Z',
      consignee_state: 'State A',
      consignee_country: 'Country E',
      order_id: 'Order234',
      dimensions_measure: '75x60x30 cm',
      boxes_ids: 'Box 6',
      cgst: 'CGST234',
      invoice_no: 'Inv004',
      invoice_amount: 1500,
      invoice_document_id: 'Doc234',
      payment_mode: 'Prepaid',
      cod_amount: 'COD234',
      eway_bill_no: 'E-Way Bill234',
      eway_bill_document_id: 'E-Way Doc234',
      bulk_order: 'Yes',
    },
    {
      oid: 'S5',
      company_id: 'C1',
      user_id: 'U5',
      warehouse_name: 'W1',
      product_description: 'Appliances',
      shipment_weight: 12,
      fragile: 'No',
      reference_id: 'R5',
      boxes: ['Box 7', 'Box 8', 'Box 9'],
      chargeable_weight: 24,
      consignee_name: 'Customer E',
      consignee_city: 'City A',
      consignee_state: 'State B',
      consignee_country: 'Country C',
      order_id: 'Order567',
      dimensions_measure: '80x50x40 cm',
      boxes_ids: 'Box 7, Box 8, Box 9',
      cgst: 'CGST567',
      invoice_no: 'Inv005',
      invoice_amount: 2000,
      invoice_document_id: 'Doc567',
      payment_mode: 'Prepaid',
      cod_amount: 'COD567',
      eway_bill_no: 'E-Way Bill567',
      eway_bill_document_id: 'E-Way Doc567',
      bulk_order: 'No',
    },
  ];
  
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [gst, setGST] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [registered, setRegistered] = useState(false);

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState("");
  const [otp, setOTP] = useState("");
  const [otpSent, setOTPSent] = useState("");


  const companyRef = useRef(null);
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const countryRef = useRef(null);
  const gstRef = useRef(null);
  const postalCodeRef = useRef(null);
  const phoneRef = useRef(null);
  const otpRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const modalRef = useRef();

  const handleOpenModal = () => {
    modalRef.current.openModal();
  };

  const handleCloseModal = () => {
    modalRef.current.closeModal();
  };
  return (
    <div>
        <Modal ref={modalRef}>
            <h4>Add new Warehouse</h4>
        <div className="two-inputs">
            <div className="two-inputs-section">
              <label className="input-label">Warehouse Name</label>
              <input
                className="login-input-half"
                placeholder="XYZ"
                onChange={(e) => {}}
              ></input>
            </div>
            <div className="two-inputs-section">
              <label className="input-label">Address</label>
              <input
                className="login-input-half"
                placeholder="Mumbai"
                onChange={(e) => {}}
              ></input>
            </div>
          </div>
          <div className="two-inputs">
                <div className="two-inputs-section">
                  <label className="input-label">City</label>
                  <input
                    className="login-input-half"
                    placeholder="Delhi"
                    value={city}
                    ref={cityRef}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (!isEmpty(e.target.value)) {
                        cityRef.current.classList.remove("error-border");
                      }
                    }}
                  ></input>
                </div>
                <div className="two-inputs-section">
                  <label className="input-label">State</label>
                  <input
                    className="login-input-half"
                    placeholder="Delhi"
                    value={state}
                    ref={stateRef}
                    onChange={(e) => {
                      setState(e.target.value);
                      if (!isEmpty(e.target.value)) {
                        stateRef.current.classList.remove("error-border");
                      }
                    }}
                  ></input>
                </div>
              </div>
              <div className="two-inputs">
                <div className="two-inputs-section">
                  <label className="input-label">Country</label>
                  <input
                    className="login-input-half"
                    placeholder="India"
                    value={country}
                    ref={countryRef}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      if (!isEmpty(e.target.value)) {
                        countryRef.current.classList.remove("error-border");
                      }
                    }}
                  ></input>
                </div>
                <div className="two-inputs-section">
                  <label className="input-label">Postal Code</label>
                  <input
                    className="login-input-half"
                    placeholder="1100XX"
                    value={postalCode}
                    ref={postalCodeRef}
                    onChange={(e) => {
                      setPostalCode(e.target.value);
                      if (!isEmpty(e.target.value)) {
                        postalCodeRef.current.classList.remove("error-border");
                      }
                    }}
                  ></input>
                </div>
              </div>
              
        </Modal>
      <div className="section-header">
        <div>
          <h4>Shipments</h4>
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
            <Button text={"New Shipment +"} onClick={()=>{handleOpenModal()}}/>{" "}
            <Button text={<><FaDownload /></>} squareOutlined/>
            
        </div>
      </div>
      {data.length > 0?<>
        <Table data={data} />
      </>: <>
        <NoRecords/>
      </>}
    </div>
  );
}

export default Shipments;
