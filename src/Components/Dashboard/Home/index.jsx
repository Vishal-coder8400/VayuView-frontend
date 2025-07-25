import React, { useState } from "react";
import "./style.scss";
import { NewPackages } from "../../../common/icons/NewPackages";
import { ReadyForShippingIcon } from "../../../common/icons/ReadyForShippingIcon";
import { InTransitIcon } from "../../../common/icons/InTransitIcon";
import { DeliveredIcon } from "../../../common/icons/DeliveredIcon";
import UndeliveredIcon from "../../../common/icons/undelivered.png";
import RTOIcon from "../../../common/icons/RTO.png";
import { Dropdown } from "../../../common/core/Dropdown";
import Table from "./Table";
import { MapIcon } from "../../../common/icons/MapIcon";
import BarGraph from "./BarGraph";
import { callApi } from "../../../utils/api";
import { stateConnected } from "../../../utils/redux_tools";
import { addUserData } from "../../../store/actions";
import { store } from "../../../store";
import lb_truck from './icons8-logistics-94.png';
import Header from "../header";

const cities = ["Delhi", "Mumbai"];

function Home(props) {
  const formatNumber = function (val) {
    return val
      .toFixed(1)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      .split(".")[0];
  };
  const [monthlyShipment, setMonthlyShipment] = useState([])
  const [option1, setOption1] = useState([
    {
      head: "Order Placed",
      icon: (
        <>
          <NewPackages />
        </>
      ),
      value: 0,
      trend: "up",
      trendValue: 5,
      sub: "Up Value Indicates Higher Crowd",
    },
    {
      head: "In Transit",
      value: 0,
      icon: (
        <>
          <InTransitIcon />
        </>
      ),
      trend: "up",
      trendValue: 10,
      sub: "Above the threshold!",
    },
    {
      head: "RTD",
      icon: (
        <>
          <ReadyForShippingIcon />
        </>
      ),
      value: 0,
      trend: "down",
      trendValue: -8.34,
      sub: "Social Distancing On Rise",
    },
    {
      head: "Undelivered",
      icon: (
        <>
          <img src={UndeliveredIcon} height={"24px"} width={"24px"} />
        </>
      ),
      value: 0,
      trend: "up",
      trendValue: 11.2,
      sub: "Last Week No Mask Rise",
    },
    {
      head: "Delivered",
      icon: (
        <>
          <DeliveredIcon />
        </>
      ),
      value: 0,
      trend: "up",
      trendValue: 11.2,
      sub: "Last Week No Mask Rise",
    },
    {
      head: "RTO",
      icon: (
        <>
          <img src={RTOIcon} height={"24px"} width={"24px"} />
        </>
      ),
      value: 0,
      trend: "up",
      trendValue: 11.2,
      sub: "Last Week No Mask Rise",
    },
  ]);
  const [recentLocations, setRecentLocations] = useState([
    {
      id: 101,
      destination: "",
    },
    {
      id: 102,
      destination: "",
    },
    {
      id: 103,
      destination: "",
    },
    {
      id: 104,
      destination: "",
    },
    {
      id: 105,
      destination: "",
    },
    {
      id: 106,
      destination: "",
    },
    {
      id: 107,
      destination: "",
    },
  ])
  React.useEffect(() => {
    //alert('working...'+props.userData.user._id);
    (async()=>{
      // ////alert("userdata"+JSON.stringify(props.userData.user, props.userData.user._id);
      await callApi({
        endpoint: "api/users/" + props?.userData?.user?._id,
      })
        .then((res) => {
          // //alert('working'+JSON.stringify(res))
          console.log("USERDATA", res);
          if(typeof res === Object && res !== undefined && res !== null){
            //alert('dispatching... got some data.')
            store.dispatch(addUserData({ user: res }));
          }
        })
        .catch((err) => {
          //alert(
          //   'issue.'
          // )
        });
  
    })();

    callApi({
      endpoint: "api/shipping/insights/",
    })
      .then((res) => {
        console.log(res, "RESPONSEE....");
        const { stateCounts, topAreas, monthlyShipment } = res;

        // Map over the existing state and update values
        const updatedOptions = option1.map((option) => {
          // Find the matching state count from the API response
          const matchingState = stateCounts.find(
            (state) => state.state === option.head
          );
          return {
            ...option, // Spread existing properties
            value: matchingState ? matchingState.count : option.value, // Update value, or keep existing if not found
          };
        });
        
     
        setRecentLocations(topAreas)
        setOption1(updatedOptions);
        const monthlyShipmentData = monthlyShipment.map(item => ({
          label: `${item._id.month}/${item._id.year}`, // Format the label as month/year
          value: item.count // Use count as the value
        }));
        setMonthlyShipment(monthlyShipmentData)
        console.log(res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  const [city, setCity] = React.useState("Delhi");
  return (
    <div className="section-wrapper">
      <Header/>
      <br />

      <div className="welcome-banner">
        <label className="banner-heading">
        Welcome to AQM
        </label>
        <br/>
        <div style={{ width: '500px'}}>
         The purpose of a product update is to add new
        features, fix bugs or improve the performance of the product.
        </div>
        
        <img src={lb_truck} style={{float: 'right', marginTop: '-8%'}}>
        </img>
      </div>
     
      <br />
      <div className="section">
        {option1.map((v) => {
          return (
            <>
              <div className="section-option">
                <div className="section-option-icon">{v.icon}</div>
                <div className="section-option-head"> {v.head}</div>
                <div className="section-main">
                  <div className="section-num">{formatNumber(v.value)}</div>
                  {/* {v.trend === "up" ? (
                    <div className="section-trend">
                      {v.trend === "up" ? "↗" : "↘"}
                      {v.trendValue} %
                    </div>
                  ) : (
                    <div className="section-trend-low">
                      {v.trend === "up" ? "↗" : "↘"}
                      {v.trendValue} %
                    </div>
                  )} */}
                </div>
                {/* <div className="section-sub">{v.sub}</div> */}
              </div>
            </>
          );
        })}
      </div>
      <div className="delivery-section">
        <div className="deliveries-table">
          <div className="deliveries-table-header">
            <div>
              <h4>Recent Shipments</h4>
            </div>
            <div>
              {/* <h5>See All {">"}</h5> */}
            </div>
          </div>
          <Table data={recentLocations}/>
        </div>
        <div className="deliveries-daily-plan">
          <BarGraph
            data={monthlyShipment}
          />
        </div>
      </div>
      {/* <div className="delivery-section">
        <div className="deliveries-table">
          <div className="deliveries-table-header">
            <div>
              <h4>Warehouses</h4>
            </div>
            <div>
              <h5>See All {">"}</h5>
            </div>
          </div>
        </div>
        <div className="deliveries-daily-plan"></div>
      </div> */}
    </div>
  );
}

export default stateConnected(Home);
