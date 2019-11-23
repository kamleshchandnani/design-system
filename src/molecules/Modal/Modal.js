import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import ModalCard from './ModalCard';
import ModalPanel from './ModalPanel';
import { ModalContext } from '../Modal';

/**
 * Portals
 * Context
 * Compound Component
 *
 */

/**
 * ModalScrim SUCESS, WARNING etc
 *
 */

const getAnimationType = ({ animationType }) => {
  if (animationType === 'fade') {
    return keyframes`	
    from {	
      opacity: 0;	
    }	
    to {	
      opacity: 0.5;	
    }`;
  }
  if (animationType === 'slide-left') {
    return keyframes`	
    from {	
      transform: translateX(-100vw);	
    }	
    to {	
      transform: translateX(0vw);	
    }`;
  }
  if (animationType === 'slide-right') {
    return keyframes`	
    from {	
      transform: translateX(100vw);	
    }	
    to {	
      transform: translateX(0vw);	
    }`;
  }
  return keyframes``;
};

const ModalScrim = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: 0.5;
  animation: 0.3s ${getAnimationType};
  animation-fill-mode: forwards;
  background-color: ${(props) => props.theme.variants.modal[props.variant]};
`;

const Modal = ({ isOpen, onClose, variant, animationType, children, ...props }) => {
  const modalElementRef = React.useRef(document.createElement('div'));
  const modalContextValue = { isOpen, onClose };

  React.useEffect(() => {
    document.body.appendChild(modalElementRef.current);

    const modalElement = modalElementRef.current;

    return () => {
      document.body.removeChild(modalElement);
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalContext.Provider value={modalContextValue}>
      {isOpen ? (
        <React.Fragment>
          <ModalScrim variant={variant} animationType={animationType} {...props} />
          {children}
        </React.Fragment>
      ) : null}
    </ModalContext.Provider>,
    modalElementRef.current
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['SUCCESS', 'ERROR', 'INFO', 'WARNING']),
  animationType: PropTypes.oneOf(['fade', 'slide-left', 'slide-right']),
  children: PropTypes.node,
};

Modal.Card = ModalCard;

Modal.Panel = ModalPanel;

export default Modal;
