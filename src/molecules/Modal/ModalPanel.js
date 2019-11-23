import React from 'react';
import styled, { keyframes } from 'styled-components';
import { color } from 'styled-system';
import PropTypes from 'prop-types';
import { useModalContext } from '../Modal';
import { IconClose } from '../../atoms/Icon';
import Position from '../../atoms/Position';

const getModalPanelAnimationType = ({ position }) => {
  if (position === 'left') {
    return keyframes`
    from {
      transform: translateX(-100vw);
    }
    to {
      transform: translateX(0vw);
    }`;
  }
  if (position === 'right') {
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

const StyledModalPanel = styled(({ position, ...props }) => <div {...props} />)`
  position: absolute;
  width: 300px;
  height: 100%
  top: 0;
  bottom: 0;
  right: ${(props) => (props.position === 'right' ? 0 : '')};
  left: ${(props) => (props.position === 'left' ? 0 : '')};
  animation: 1s ${getModalPanelAnimationType};
  animation-fill-mode: forwards;
  ${color}
`;

const ModalPanel = ({ position, children, ...props }) => {
  const { onClose } = useModalContext();

  return (
    <StyledModalPanel position={position} {...props} bg="white">
      {onClose ? (
        <React.Fragment>
          <Position position="absolute" right={0}>
            <IconClose onClick={onClose} color="grey" size="xl" />
          </Position>
        </React.Fragment>
      ) : null}
      {children}
    </StyledModalPanel>
  );
};
ModalPanel.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default ModalPanel;
