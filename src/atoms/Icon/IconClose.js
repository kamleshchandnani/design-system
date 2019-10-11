import React from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';
import { theme } from '../../tokens';

const IconClose = ({ color, size, onClick }) => (
  <MdClose
    color={color}
    size={theme.fonts.sizes[size]}
    onClick={onClick}
    style={{ padding: '2px' }}
  />
);

IconClose.propTypes = {
  color: PropTypes.oneOf(Object.keys(theme.colors)),
  size: PropTypes.oneOf(Object.keys(theme.fonts.sizes)),
  onClick: PropTypes.func,
};

export default IconClose;
