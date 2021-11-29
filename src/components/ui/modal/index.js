import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../store/modalSlice";

import "./modal.scss";

const ModalOverlay = ({ children }) => {
  return (
    <div className="modal">
      <div className="content">{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = ({ children }) => {
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  return (
    <>
      {ReactDOM.createPortal(
        <div className="backdrop" onClick={closeModalHandler} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
