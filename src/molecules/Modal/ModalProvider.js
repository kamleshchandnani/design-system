import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import ModalContext from './ModalContext';

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

const ModalProvider = () => {};

ModalProvider.propTypes = {
  children: PropTypes.node,
};

export default ModalProvider;
