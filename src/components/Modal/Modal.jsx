// import { Component } from "react";
import { useEffect } from "react";
import { createPortal } from 'react-dom';
import PropTypes from "prop-types"
import { StyleModal, Overlay } from './Modal.styled';


export const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const onOverlay = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={onOverlay}>
      <StyleModal>
        <img src={image.largeUrl} alt={image.targetAlt} />
      </StyleModal>
    </Overlay>,
    document.querySelector("#modalRoot")
  );
};

Modal.propTypes = {
  image: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};