import React, { useRef, useState } from "react";
import Table from "../../../common/core/Table";
import { Button } from "../../../common/core/Button";
import { FaDownload, FaIcons } from "react-icons/fa";
import NoRecords from "../../../common/core/NoRecords";
import { add, create, first, isEmpty, last } from "lodash";
import Modal from "../../../common/Modal";
import ToggleDays from "./ToggleWeek";
import TimePicker from "./TimePicker";
import { callApi } from "../../../utils/api";
import { store } from "../../../store";
import Error from "../../../utils/Error";

function Warehouses() {
  const [data, setData] = useState([])
  // const data = [];
  // const data = [
  //     {
  //       company_id: 'C1',
  //       user_id: 'U1',
  //       warehouse_name: 'Warehouse A',
  //       warehouse_address: '123 Main St',
  //       postal_code: '12345',
  //       warehouse_city: 'City A',
  //       warehouse_state: 'State A',
  //       warehouse_country: 'Country A',
  //       contact_person: 'John Doe',
  //       contact_person_mail: 'john.doe@example.com',
  //       contact_person_number: '123-456-7890',
  //       rto: true,
  //       schedule_start_time: '08:00 AM',
  //       schedule_end_time: '05:00 PM',
  //       working_days: [1, 2, 3, 4, 5],
  //       slot: 'Slot A',
  //     },
  //     {
  //       company_id: 'C2',
  //       user_id: 'U2',
  //       warehouse_name: 'Warehouse B',
  //       warehouse_address: '456 Elm St',
  //       postal_code: '54321',
  //       warehouse_city: 'City B',
  //       warehouse_state: 'State B',
  //       warehouse_country: 'Country B',
  //       contact_person: 'Alice Smith',
  //       contact_person_mail: 'alice.smith@example.com',
  //       contact_person_number: '987-654-3210',
  //       rto: false,
  //       schedule_start_time: '07:00 AM',
  //       schedule_end_time: '04:00 PM',
  //       working_days: [1, 2, 3],
  //       slot: 'Slot B',
  //     },
  //     {
  //       company_id: 'C3',
  //       user_id: 'U3',
  //       warehouse_name: 'Warehouse C',
  //       warehouse_address: '789 Oak St',
  //       postal_code: '67890',
  //       warehouse_city: 'City C',
  //       warehouse_state: 'State C',
  //       warehouse_country: 'Country C',
  //       contact_person: 'Eve Johnson',
  //       contact_person_mail: 'eve.johnson@example.com',
  //       contact_person_number: '345-678-9012',
  //       rto: true,
  //       schedule_start_time: '09:00 AM',
  //       schedule_end_time: '06:00 PM',
  //       working_days: [2, 3, 4],
  //       slot: 'Slot C',
  //     },
  //     {
  //       company_id: 'C4',
  //       user_id: 'U4',
  //       warehouse_name: 'Warehouse D',
  //       warehouse_address: '101 Pine St',
  //       postal_code: '45678',
  //       warehouse_city: 'City D',
  //       warehouse_state: 'State D',
  //       warehouse_country: 'Country D',
  //       contact_person: 'Bob Wilson',
  //       contact_person_mail: 'bob.wilson@example.com',
  //       contact_person_number: '234-567-8901',
  //       rto: true,
  //       schedule_start_time: '08:30 AM',
  //       schedule_end_time: '04:30 PM',
  //       working_days: [4, 5],
  //       slot: 'Slot D',
  //     },
  //     {
  //       company_id: 'C5',
  //       user_id: 'U5',
  //       warehouse_name: 'Warehouse E',
  //       warehouse_address: '555 Maple St',
  //       postal_code: '23456',
  //       warehouse_city: 'City E',
  //       warehouse_state: 'State E',
  //       warehouse_country: 'Country E',
  //       contact_person: 'Mary Brown',
  //       contact_person_mail: 'mary.brown@example.com',
  //       contact_person_number: '456-789-0123',
  //       rto: false,
  //       schedule_start_time: '08:00 AM',
  //       schedule_end_time: '05:00 PM',
  //       working_days: [1, 3, 5],
  //       slot: 'Slot E',
  //     },
  //     {
  //       company_id: 'C4',
  //       user_id: 'U4',
  //       warehouse_name: 'Warehouse D',
  //       warehouse_address: '101 Pine St',
  //       postal_code: '45678',
  //       warehouse_city: 'City D',
  //       warehouse_state: 'State D',
  //       warehouse_country: 'Country D',
  //       contact_person: 'Bob Wilson',
  //       contact_person_mail: 'bob.wilson@example.com',
  //       contact_person_number: '234-567-8901',
  //       rto: true,
  //       schedule_start_time: '08:30 AM',
  //       schedule_end_time: '04:30 PM',
  //       working_days: [4, 5],
  //       slot: 'Slot D',
  //     },
  //     {
  //       company_id: 'C5',
  //       user_id: 'U5',
  //       warehouse_name: 'Warehouse E',
  //       warehouse_address: '555 Maple St',
  //       postal_code: '23456',
  //       warehouse_city: 'City E',
  //       warehouse_state: 'State E',
  //       warehouse_country: 'Country E',
  //       contact_person: 'Mary Brown',
  //       contact_person_mail: 'mary.brown@example.com',
  //       contact_person_number: '456-789-0123',
  //       rto: false,
  //       schedule_start_time: '08:00 AM',
  //       schedule_end_time: '05:00 PM',
  //       working_days: [1, 3, 5],
  //       slot: 'Slot E',
  //     },
  //     {
  //       company_id: 'C4',
  //       user_id: 'U4',
  //       warehouse_name: 'Warehouse D',
  //       warehouse_address: '101 Pine St',
  //       postal_code: '45678',
  //       warehouse_city: 'City D',
  //       warehouse_state: 'State D',
  //       warehouse_country: 'Country D',
  //       contact_person: 'Bob Wilson',
  //       contact_person_mail: 'bob.wilson@example.com',
  //       contact_person_number: '234-567-8901',
  //       rto: true,
  //       schedule_start_time: '08:30 AM',
  //       schedule_end_time: '04:30 PM',
  //       working_days: [4, 5],
  //       slot: 'Slot D',
  //     },
  //     {
  //       company_id: 'C5',
  //       user_id: 'U5',
  //       warehouse_name: 'Warehouse E',
  //       warehouse_address: '555 Maple St',
  //       postal_code: '23456',
  //       warehouse_city: 'City E',
  //       warehouse_state: 'State E',
  //       warehouse_country: 'Country E',
  //       contact_person: 'Mary Brown',
  //       contact_person_mail: 'mary.brown@example.com',
  //       contact_person_number: '456-789-0123',
  //       rto: false,
  //       schedule_start_time: '08:00 AM',
  //       schedule_end_time: '05:00 PM',
  //       working_days: [1, 3, 5],
  //       slot: 'Slot E',
  //     },

  //   ];
  const [warehouseName, setWarehouseName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [contact_person, setContactPerson] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [contact_person_email, setContactPersonEmail] = useState("");
  const [contact_person_phone, setContactPersonPhone] = useState("");
  const [person_position, setPersonPosition] = useState("");
  // const [person_position, setPersonPosition] = useState("");
  const [registered, setRegistered] = useState(false);

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState("");
  const [otp, setOTP] = useState("");
  const [otpSent, setOTPSent] = useState("");

  const warehouseNameRef = useRef(null);
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

  function mapObjectList(originalList) {
    return originalList.map((org) => {
      const conv = {
        company_id: org.cid,
        user_id: org.uid,
        warehouse_name: org.wn,
        warehouse_address: org.wa,
        postal_code: org.pc,
        warehouse_city: org.ci,
        warehouse_state: org.st,
        warehouse_country: org.cn,
        contact_person: org.cp,
        contact_person_mail: org.cpm,
        contact_person_number: org.cmpn,
        rto: org.rto,
        schedule_start_time: '', // You can fill this based on your logic
        schedule_end_time: '', // You can fill this based on your logic
        working_days: [], // You can fill this based on your logic
        slot: '', // You can fill this based on your logic
      };
  
      return conv;
    });
  }
  
  const getWarehouses = () => {
    callApi({
      method: "GET",
      endpoint: "api/warehouses",
    })
      .then((res) => {
        console.log(res)
        setData(mapObjectList(res))
        // {
          //       company_id: 'C5',
          //       user_id: 'U5',
          //       warehouse_name: 'Warehouse E',
          //       warehouse_address: '555 Maple St',
          //       postal_code: '23456',
          //       warehouse_city: 'City E',
          //       warehouse_state: 'State E',
          //       warehouse_country: 'Country E',
          //       contact_person: 'Mary Brown',
          //       contact_person_mail: 'mary.brown@example.com',
          //       contact_person_number: '456-789-0123',
          //       rto: false,
          //       schedule_start_time: '08:00 AM',
          //       schedule_end_time: '05:00 PM',
          //       working_days: [1, 3, 5],
          //       slot: 'Slot E',
          //     },
      })
      .catch(() => {});
  };
  React.useEffect(()=>{
    getWarehouses()
  }, [])
  const saveWarehouse = () => {
    console.log(store.getState());
    if(contact_person_phone.length!==10){
      Error("Phone number must be of 10 digits");
      return;
    }
    callApi({
      method: "POST",
      endpoint: "api/warehouses",
      data: {
        user_id: store.getState().userData.user.oid,
        warehouse_name: warehouseName,
        warehouse_address: address,
        postal_code: postalCode,
        warehouse_city: city,
        warehouse_state: state,
        warehouse_country: country,
        contact_person: contact_person,
        contact_person_mail: contact_person_email,
        contact_person_number: contact_person_phone,
        // rto,
        // schedule_start_time,
        // schedule_end_time,
        // working_days,
        // slot,
      },
      alert: true,
    })
      .then(() => {
        setRegistered(true);
        getWarehouses();
        modalRef.current.closeModal();
      })
      .catch(() => {});
  };

  return (
    <div>
      <Modal ref={modalRef}>
        <h4>Add new Warehouse</h4>
        <div style={{ display: "flex" }}>
          <div style={{ flex: "60%" }}>
            <div className="two-inputs">
              <div className="two-inputs-section">
                <label className="input-label">
                  Warehouse Name <span className="asterisk-span">*</span>
                </label>
                <input
                  className="login-input-half"
                  placeholder="XYZ"
                  ref={warehouseNameRef}
                  value={warehouseName}
                  onChange={(e) => {
                    setWarehouseName(e.target.value);
                    if (!isEmpty(e.target.value)) {
                      warehouseNameRef.current.classList.remove("error-border");
                    }
                  }}
                ></input>
              </div>
              <div className="two-inputs-section">
                <label className="input-label">Address</label>
                <input
                  className="login-input-half"
                  placeholder="Mumbai"
                  ref={addressRef}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (!isEmpty(e.target.value)) {
                      addressRef.current.classList.remove("error-border");
                    }
                  }}
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
            <div className="two-inputs">
              <div className="two-inputs-section">
                <label className="input-label">Contact Person Name</label>
                <input
                  className="login-input-half"
                  placeholder="John Doe"
                  value={contact_person}
                  // ref={countryRef}
                  onChange={(e) => {
                    setContactPerson(e.target.value);
                    // if (!isEmpty(e.target.value)) {
                    //   countryRef.current.classList.remove("error-border");
                    // }
                  }}
                ></input>
              </div>
              <div className="two-inputs-section">
                <label className="input-label">Contact Person Phone</label>
                <input
                  className="login-input-half"
                  placeholder="XXXXX - XXXXX"
                  value={contact_person_phone}
                  // ref={postalCodeRef}
                  onChange={(e) => {
                    setContactPersonPhone(e.target.value);
                    // if (!isEmpty(e.target.value)) {
                    //   postalCodeRef.current.classList.remove("error-border");
                    // }
                  }}
                ></input>
              </div>
            </div>
            <div className="two-inputs">
              <div className="two-inputs-section">
                <label className="input-label">Contact Person Email</label>
                <input
                  className="login-input-half"
                  placeholder="john.doe@company.xyz"
                  value={contact_person_email}
                  // ref={countryRef}
                  onChange={(e) => {
                    setContactPersonEmail(e.target.value);
                    // if (!isEmpty(e.target.value)) {
                    //   countryRef.current.classList.remove("error-border");
                    // }
                  }}
                ></input>
              </div>
              <div className="two-inputs-section">
                <label className="input-label">Contact Person Position</label>
                <input
                  className="login-input-half"
                  placeholder="MD"
                  value={person_position}
                  // ref={postalCodeRef}
                  onChange={(e) => {
                    setPersonPosition(e.target.value);
                    // if (!isEmpty(e.target.value)) {
                    //   postalCodeRef.current.classList.remove("error-border");
                    // }
                  }}
                ></input>
              </div>
            </div>
          </div>
          <div style={{ flex: "40%", padding: "10px" }}>
            Working Days
            <ToggleDays />
            <br />
            <div className="two-inputs">
              <div className="two-inputs-section">
                <label className="input-label">Start Time</label>
                <input
                  className="login-input-half"
                  placeholder="10:00 AM"
                  onChange={(e) => {}}
                ></input>
              </div>
              <div className="two-inputs-section">
                <label className="input-label">End Time</label>
                <input
                  className="login-input-half"
                  placeholder="10:00 PM"
                  onChange={(e) => {}}
                ></input>
              </div>
            </div>
            <input type="checkbox"></input>&nbsp;&nbsp;RTO
            {/* Start Time */}
            {/* <TimePicker/> */}
          </div>
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            text={"Save Warehouse"}
            onClick={() => {
              saveWarehouse();
            }}
          ></Button>
        </div>
      </Modal>
      <div className="section-header">
        <div>
          <h4>Warehouses</h4>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            text={"Add Warehouse +"}
            onClick={() => {
              handleOpenModal();
            }}
          />{" "}
          <Button
            text={
              <>
                <FaDownload />
              </>
            }
            squareOutlined
          />
        </div>
      </div>
      {data.length > 0 ? (
        <>
          <Table data={data} />
        </>
      ) : (
        <>
          <NoRecords />
        </>
      )}
    </div>
  );
}

export default Warehouses;
