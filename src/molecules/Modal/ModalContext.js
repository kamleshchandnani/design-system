import React from 'react';

const ModalContext = React.createContext();

export const useModalContext = () => {
  const modalContext = React.useContext(ModalContext);
  if (modalContext === undefined) {
    throw new Error('useModalContext must be used within a ModalConextProvider');
  }
  return modalContext;
};

export default ModalContext;
