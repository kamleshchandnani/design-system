import React from 'react';
import { ThemeProvider } from 'styled-components';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { themes } from '@storybook/theming';
import { theme } from '../src/tokens';
import { ModalProvider } from '../src/molecules/Modal';

addParameters({
  options: {
    theme: themes.dark,
  },
});

addDecorator((Story) => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <ModalProvider>
        <Story />
      </ModalProvider>
    </React.Fragment>
  </ThemeProvider>
));

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
