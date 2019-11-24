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
  });
