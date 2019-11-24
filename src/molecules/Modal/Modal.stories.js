import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import Modal from '../Modal';
import Flex from '../../atoms/Flex';
import Space from '../../atoms/Space';
import Text from '../../atoms/Text';
import { theme } from '../../tokens';

storiesOf('Modal', module)
  .addParameters({
    component: Modal,
  })
  .addDecorator(withKnobs)
  .add('Simple Modal', () => {
    /**
     * Limitations:
     * 1. Every Component has to maintain the state of Modal
     * 2. If I have to create modal over modal it becomes very difficult since Modal is a controlled input meaning the consumers are controlling it
     * 3. If I have to open/close specific Modal in the whole tree it becomes clumsy because again Controlled Modal
     * 4. If I have to open a Modal from a function which doesn't render JSX then I cannot do it with this implementation
     */
    const [open, setOpen] = React.useState(false);
    const modalVariants = select('variant', Object.keys(theme.variants.modal), 'WARNING');
    const modalAnimationType = select(
      'animation type',
      ['fade', 'slide-left', 'slide-right'],
      'fade'
    );

    return (
      <React.Fragment>
        <button type="button" onClick={() => setOpen(true)}>
          Open Modal
        </button>
        <Modal
          variant={modalVariants}
          isOpen={open}
          onClose={() => setOpen(false)}
          animationType={modalAnimationType}
        >
          <Modal.Card width="300px" height="200px">
            <Space p={3}>
              <Flex flexDirection="column">
                <Space mt={2} mb={2}>
                  <Text fontSize="m" fontFamily="sans-serif" color="greyDark" fontWeight="bold">
                    This is modal Title
                  </Text>
                </Space>
                <Space mt={3} mb={3}>
                  <Text fontSize="s" fontFamily="sans-serif" color="greyDark">
                    This is modal Content. Modal Content. Modal Content. Modal Content. Modal
                    Content. Modal Content. Modal Content.
                  </Text>
                </Space>
                <Space mt={2} mb={2}>
                  <Text fontSize="m" fontFamily="sans-serif" color="greyDark">
                    This is modal Footer
                  </Text>
                </Space>
              </Flex>
            </Space>
          </Modal.Card>
        </Modal>
      </React.Fragment>
    );
  });
