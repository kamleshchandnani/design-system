import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs/react';
import { ModalProvider, ModalCard, ModalPanel, useModalContext } from '../Modal';
import Flex from '../../atoms/Flex';
import Space from '../../atoms/Space';
import Text from '../../atoms/Text';
import { theme } from '../../tokens';

storiesOf('Modal', module)
  .addParameters({
    component: ModalProvider,
  })
  .addDecorator(withKnobs)
  .add('Modal with Card Frame', () => {
    const modalContext = useModalContext();
    const modalVariants = select('variant', Object.keys(theme.variants.modal), 'WARNING');
    const modalAnimationType = select(
      'animation type',
      ['fade', 'slide-left', 'slide-right'],
      'fade'
    );

    const ModalContent = () => (
      <ModalCard width="300px" height="200px" onClose={() => modalContext.closeModal()}>
        <Space p={3}>
          <Flex flexDirection="column">
            <Space mt={2} mb={2}>
              <Text fontSize="m" fontFamily="sans-serif" color="greyDark" fontWeight="bold">
                This is modal Title
              </Text>
            </Space>
            <Space mt={3} mb={3}>
              <Text fontSize="s" fontFamily="sans-serif" color="greyDark">
                This is modal Content. Modal Content. Modal Content. Modal Content. Modal Content.
                Modal Content. Modal Content.
              </Text>
            </Space>
            <Space mt={2} mb={2}>
              <Text fontSize="m" fontFamily="sans-serif" color="greyDark">
                This is modal Footer
              </Text>
            </Space>
          </Flex>
        </Space>
      </ModalCard>
    );

    return (
      <React.Fragment>
        <button
          type="button"
          onClick={() => {
            modalContext.openModal({
              variant: modalVariants,
              animationType: modalAnimationType,
              component: ModalContent,
            });
          }}
        >
          Open Modal
        </button>
      </React.Fragment>
    );
  })
  .add('Modal with Panel Frame', () => {
    const modalContext = useModalContext();
    const modalVariants = select('variant', Object.keys(theme.variants.modal), 'INFO');
    const modalAnimationType = select(
      'animation type',
      ['fade', 'slide-left', 'slide-right'],
      'fade'
    );

    const ModalContent = () => (
      <ModalPanel position="left" onClose={() => modalContext.closeModal()}>
        <Space p={3}>
          <Flex flexDirection="column">
            <Space mt={2} mb={2}>
              <Text fontSize="m" fontFamily="sans-serif" color="greyDark" fontWeight="bold">
                This is modal Title
              </Text>
            </Space>
            <Space mt={3} mb={3}>
              <Text fontSize="s" fontFamily="sans-serif" color="greyDark">
                This is modal Content. Modal Content. Modal Content. Modal Content. Modal Content.
                Modal Content. Modal Content. Modal Content. Modal Content. Modal Content. Modal
                Content. Modal Content.
              </Text>
            </Space>
          </Flex>
        </Space>
      </ModalPanel>
    );

    return (
      <React.Fragment>
        <button
          type="button"
          onClick={() => {
            modalContext.openModal({
              variant: modalVariants,
              animationType: modalAnimationType,
              component: ModalContent,
            });
          }}
        >
          Open Modal
        </button>
      </React.Fragment>
    );
  })
  .add('Confirmation Modal', () => {
    const modalContext = useModalContext();
    const modalVariants = select('variant', Object.keys(theme.variants.modal), 'SUCCESS');
    const modalAnimationType = select(
      'animation type',
      ['fade', 'slide-left', 'slide-right'],
      'fade'
    );

    const ModalContent = () => (
      <ModalCard width="500px" height="200px">
        <Space p={3}>
          <Flex flexDirection="column">
            <Space mt={2} mb={2}>
              <Text fontSize="m" fontFamily="sans-serif" color="greyDark" fontWeight="bold">
                Confirmation Modal
              </Text>
            </Space>
            <Space mt={4} mb={3}>
              <Text fontSize="l" fontFamily="sans-serif" color="greyDark">
                Are you sure you want to perform this action?
              </Text>
            </Space>
            <Space mt={4} mb={2}>
              <Flex flexDirection="row" justifyContent="flex-end">
                <button type="button" onClick={() => modalContext.closeModal()}>
                  Cancel
                </button>
                <button type="button" onClick={() => modalContext.closeModal()}>
                  Confirm
                </button>
              </Flex>
            </Space>
          </Flex>
        </Space>
      </ModalCard>
    );

    return (
      <React.Fragment>
        <button
          type="button"
          onClick={() => {
            modalContext.openModal({
              variant: modalVariants,
              animationType: modalAnimationType,
              component: ModalContent,
            });
          }}
        >
          Open Modal
        </button>
      </React.Fragment>
    );
  })
  .add('Modal Over Modal', () => {
    const modalContext = useModalContext();
    const modalVariants = select('variant', Object.keys(theme.variants.modal), 'SUCCESS');
    const modalAnimationType = select(
      'animation type',
      ['fade', 'slide-left', 'slide-right'],
      'fade'
    );

    const ModalNestedContent = () => (
      <ModalCard
        width="300px"
        height="200px"
        onClose={() => {
          modalContext.closeModal();
        }}
      >
        <Space p={3}>
          <Flex flexDirection="column">
            <Space mt={2} mb={2}>
              <Text fontSize="m" fontFamily="sans-serif" color="greyDark" fontWeight="bold">
                This is modal Title
              </Text>
            </Space>
            <Space mt={3} mb={3}>
              <Text fontSize="s" fontFamily="sans-serif" color="greyDark">
                This is modal Content. Modal Content. Modal Content. Modal Content. Modal Content.
                Modal Content. Modal Content.
              </Text>
            </Space>
            <Space mt={2} mb={2}>
              <Text fontSize="m" fontFamily="sans-serif" color="greyDark">
                This is modal Footer
              </Text>
            </Space>
          </Flex>
        </Space>
      </ModalCard>
    );

    const ModalContent = () => (
      <ModalCard width="500px" height="200px">
        <Space p={3}>
          <Flex flexDirection="column">
            <Space mt={2} mb={2}>
              <Text fontSize="m" fontFamily="sans-serif" color="greyDark" fontWeight="bold">
                Confirmation Modal
              </Text>
            </Space>
            <Space mt={4} mb={3}>
              <Text fontSize="l" fontFamily="sans-serif" color="greyDark">
                Are you sure you want to perform this action?
              </Text>
            </Space>
            <Space mt={4} mb={2}>
              <Flex flexDirection="row" justifyContent="flex-end">
                <button
                  type="button"
                  onClick={() => {
                    modalContext.closeModal();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    modalContext.openModal({
                      variant: 'INFO',
                      animationType: modalAnimationType,
                      component: ModalNestedContent,
                    });
                  }}
                >
                  Confirm
                </button>
              </Flex>
            </Space>
          </Flex>
        </Space>
      </ModalCard>
    );

    return (
      <React.Fragment>
        <button
          type="button"
          onClick={() => {
            modalContext.openModal({
              variant: modalVariants,
              animationType: modalAnimationType,
              component: ModalContent,
            });
          }}
        >
          Open Modal
        </button>
      </React.Fragment>
    );
  })
  .add('Modal Stack', () => {
    const modalContext = useModalContext();
    const modalVariants = select('variant', Object.keys(theme.variants.modal), 'SUCCESS');
    const modalAnimationType = select(
      'animation type',
      ['fade', 'slide-left', 'slide-right'],
      'fade'
    );

    const ModalNestedContent = () => (
      <ModalCard width="300px" height="200px">
        <Space p={3}>
          <Flex flexDirection="column">
            <Space mt={2} mb={2}>
              <Text fontSize="m" fontFamily="sans-serif" color="greyDark" fontWeight="bold">
                This is modal Title
              </Text>
            </Space>
            <Space mt={3} mb={3}>
              <Text fontSize="s" fontFamily="sans-serif" color="greyDark">
                Modal Stack
              </Text>
            </Space>
            <Space mt={4} mb={2}>
              <Flex flexDirection="row" justifyContent="flex-end">
                <button
                  type="button"
                  onClick={() => {
                    modalContext.closeModal({ modalId: 2 });
                  }}
                >
                  Close me
                </button>
                <button
                  type="button"
                  onClick={() => {
                    modalContext.closeModal({ modalId: 1 });
                  }}
                >
                  Close Modal behind me
                </button>
              </Flex>
            </Space>
          </Flex>
        </Space>
      </ModalCard>
    );

    const ModalContent = () => (
      <ModalCard width="500px" height="200px">
        <Space p={3}>
          <Flex flexDirection="column">
            <Space mt={2} mb={2}>
              <Text fontSize="m" fontFamily="sans-serif" color="greyDark" fontWeight="bold">
                Confirmation Modal
              </Text>
            </Space>
            <Space mt={4} mb={3}>
              <Text fontSize="l" fontFamily="sans-serif" color="greyDark">
                Open another modal
              </Text>
            </Space>
            <Space mt={4} mb={2}>
              <Flex flexDirection="row" justifyContent="flex-end">
                <button
                  type="button"
                  onClick={() => {
                    modalContext.closeModal();
                  }}
                >
                  Close me
                </button>
                <button
                  type="button"
                  onClick={() => {
                    modalContext.openModal({
                      variant: 'INFO',
                      animationType: modalAnimationType,
                      component: ModalNestedContent,
                    });
                  }}
                >
                  Open Modal
                </button>
              </Flex>
            </Space>
          </Flex>
        </Space>
      </ModalCard>
    );

    return (
      <React.Fragment>
        <button
          type="button"
          onClick={() => {
            modalContext.openModal({
              variant: modalVariants,
              animationType: modalAnimationType,
              component: ModalContent,
            });
          }}
        >
          Open Modal
        </button>
      </React.Fragment>
    );
  })
  .add('Modal Card Frame', () => {
    return (
      <React.Fragment>
        <ModalCard width={text('width', '500px')} height={text('height', '200px')}>
          <Space p={3}>
            <Flex flexDirection="column">
              <Space mt={2} mb={2}>
                <Text fontSize="m" fontFamily="sans-serif" color="greyDark" fontWeight="bold">
                  Modal Title
                </Text>
              </Space>
              <Space mt={4} mb={3}>
                <Text fontSize="l" fontFamily="sans-serif" color="greyDark">
                  Modal Content. Modal Content. Modal Content
                </Text>
              </Space>
              <Space mt={4} mb={2}>
                <Text fontSize="m" fontFamily="sans-serif" color="greyDark">
                  Modal Title
                </Text>
              </Space>
            </Flex>
          </Space>
        </ModalCard>
      </React.Fragment>
    );
  })
  .add('Modal Panel Frame', () => {
    return (
      <React.Fragment>
        <ModalPanel position={select('position', ['left', 'right'], 'left')}>
          <Space p={3}>
            <Flex flexDirection="column">
              <Space mt={2} mb={2}>
                <Text fontSize="m" fontFamily="sans-serif" color="greyDark" fontWeight="bold">
                  Modal Title
                </Text>
              </Space>
              <Space mt={4} mb={3}>
                <Text fontSize="l" fontFamily="sans-serif" color="greyDark">
                  Modal Content. Modal Content. Modal Content
                </Text>
              </Space>
            </Flex>
          </Space>
        </ModalPanel>
      </React.Fragment>
    );
  });
