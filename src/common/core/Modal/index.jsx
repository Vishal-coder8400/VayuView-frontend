import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./style.scss";
import { useSelector } from "react-redux";
import CloseButton from "../CloseButton/CloseButton";

let ActionModal = React.forwardRef((props, ref) => {
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

  const theme = useSelector((store) => store.configs.theme);

  return (
    <>
      <Modal
        fullscreen={props.size == "f" ? true : false}
        show={props.show ? props.show : v}
        size={props._size ? props._size : ""}
        onHide={handleClose}
        dialogClassName={"check"}
      >
        {!props._noHeader && (
          <Modal.Header>
            <div className={theme}>
              <div className="head-modal-tool">
                <div>
                  <text className="head-modal-head">{props.heading}</text>
                  {/* <br /> */}
                  <text className="head-modal-sub-head">{props.subhead}</text>
                  <text className="head-modal-sub-ps">{props.subPS}</text>
                </div>
                <div>
                  {/* {props.size == "f" ? ( */}
                  <CloseButton handleClick={handleClose} />
                  {/* // ) : ( */}
                  {/* //   <></> */}
                  {/* // )} */}
                </div>
              </div>
            </div>
          </Modal.Header>
        )}
        {props.children ? (
          <Modal.Body>
            <div className={theme}>{props.children}</div>
          </Modal.Body>
        ) : null}
        {props.footer ? (
          <Modal.Footer>
            <div className={theme}>
              <div className="modal-footer-custom">{props.footer}</div>
            </div>
          </Modal.Footer>
        ) : null}
      </Modal>
      {/* <ReactModal
        isOpen={v}
        style={{
          overlay: {
            backgroundColor: "rgb(0 0 0 / 40%)",
          },
          content: {
            width:
              props.size === "s" ? "25%" : props.size === "m" ? "40%" : "80%",
            top: "100px",
            left: "40px",
            height: "fit-content",
          },
        }}
        closeTimeoutMS={300}
        onRequestClose={handleClose}
      >
        <div className="modal-popup">
          <div className="head-modal-tool">
            <text className="head-modal-head">{props.heading}</text>
            <br />
            <text className="head-modal-sub-head">{props.subhead}</text>
            <button onClick={handleClose} className="modal-close-button">
              &#10005;
            </button>
          </div>
          <div className="modal-child">
            <div className="modal-footer-discard">{props.children}</div>
          </div>
          <br />
        </div>
      </ReactModal> */}
    </>
  );
});

export default ActionModal;
