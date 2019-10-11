import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { layout, color } from 'styled-system';
import { IconClose } from '../../atoms/Icon';
import Position from '../../atoms/Position';

const fade = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}`;

const StyledModalCard = styled(({ width, height, ...props }) => <div {...props} />)`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  animation: 1s ${fade};
  overflow: auto;
  ${color}
  ${layout}
`;

const ModalCard = ({ width, height, onClose, children, ...props }) => {
  return (
    <StyledModalCard width={width} height={height} {...props} bg="white">
      {onClose ? (
        <React.Fragment>
          <Position position="absolute" right={0}>
            <IconClose onClick={onClose} color="grey" size="xl" />
          </Position>
        </React.Fragment>
      ) : null}
      {children}
    </StyledModalCard>
  );
};

ModalCard.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default ModalCard;
