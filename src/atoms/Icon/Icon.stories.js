import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import { theme } from '../../tokens';
import IconClose from './IconClose';

storiesOf('Icon', module)
  .addParameters({
    component: IconClose,
  })
  .addDecorator(withKnobs)
  .add('Close Icon', () => (
    <IconClose color={select('color', Object.keys(theme.colors), 'white')} size="xl" />
  ));
