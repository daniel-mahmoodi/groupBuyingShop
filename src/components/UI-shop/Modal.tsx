import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const Backdrop: React.FC<{ onClose: () => void }> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay: React.FC<{ children: any }> = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays")!;

const Modal: React.FC<{ onClose: () => void; children: any }> = (
  props
) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
