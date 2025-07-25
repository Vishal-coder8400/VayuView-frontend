import React, { useState } from "react";
import ReactModal from "react-modal";
import Sidebar from "react-sidebar";
// import "./full_screen_style.scss";

let FullScreenModal = React.forwardRef((props, ref) => {
  const [v, sv] = useState(false);
  React.useImperativeHandle(ref, () => ({
    _handleOpen() {
      sv(true);
    },
    _handleClose() {
      sv(false);
    },
  }));
  function handleClose() {
    sv(false);
  }
  return (
    <>
      <ReactModal
        isOpen={v}
        style={{
          overlay: {
            backgroundColor: "rgb(255,255,255)",
          },
          content: {
            top: "10px",
            right: "10px",
            height: "100vh !important",
            width: "100% !important",
            left: "0% !important",
            borderRadius: "0px !important",
          },
        }}
      >
        <>
          <div className="full-screen-modal">
            {props.children}

            <button onClick={handleClose} className="modal-close-button">
              &#10005;
            </button>
          </div>
        </>
      </ReactModal>
    </>
  );
});

export default FullScreenModal;
