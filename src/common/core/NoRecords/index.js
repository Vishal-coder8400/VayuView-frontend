import React from "react";
import InboxIcon from "@mui/icons-material/Inbox"; // Import the icon
import "./style.scss";
import { store } from "../../../store";

function NoRecords() {
  return (
    <div className="no-records-wrapper">
      <InboxIcon className="no-records-icon" style={{ fontSize: 64, color: "#bdbdbd" }} /> {/* Icon added */}
      <div className="no-records">
        No Records
      </div>
      {!store.getState().userData?.role==="customer" && 
      <div className="no-records-message">
        Add new records by clicking on <strong>Add New +</strong>
      </div>
      }
    </div>
  );
}

export default NoRecords;
