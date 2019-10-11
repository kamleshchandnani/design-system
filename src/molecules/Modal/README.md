# Modal
This is the implementation of `Modal` based on the requirements mentioned [here](../../../REQUIREMENTS.md)
## Requirements
The requirements in a nutshell(obviously you have defined it so you already know). Just to maintain context here:

1. Modal can be opened or closed from anywhere in the component tree.
2. We should be able to open multiple modals stacking over each other.
3. We should be able to check whether any modal is opened anywhere in the react component tree
4. Support some animations
5. Modal have some frame components which we can use and render our own components inside it
6. Modal has a scrim(backdrop) which can be of different types
 
## Thought Process
When we start implementing any component the first thought comes to our mind is define declarative components. But that's not always the case since you sometimes need to define imperarive APIs and this `Modal` is one such example of that.

Imagine you need to open a `Modal` in your side effects or on click of a button or any other action in short from anywhere in the component tree regardless of you to explicitly return a component.

The Modal component over here uses some really interesting APIs of `react` and demonstrates how we can leverage them for use cases like these. 

Following are the design patterns and APIs I've used to implement the `Modal`.

* Hooks
* Portals
* Context API
* Refs

## Usage
The Modal exports following things:

1. Context Provider
2. useModalContext hook to access some information related to Modal
3. Card and Panel (Modal Frame components)

#### Example
```js
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { ModalProvider } from 'design-system/Modal'
import App from './App'

const Root = () => (
  <ThemeProvider theme={{ ...theme, variants }}>
    <React.Fragment>
      <ModalProvider> // render the ModalProvider
        <App />
      </ModalProvider>
    </React.Fragment>
  </ThemeProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
```
After this anywhere in your tree you can use it like below
```js
// Dialog.js
import React from 'react'
import { ModalCard, useModalContext } from 'design-system/Modal'
import Flex from 'design-system/Flex'
import Space from 'design-system/Space'
import Text from 'design-system/Text'

const Dialog = (props) => {
  const modalContext = useModalContext();

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
  )

  return (
    <React.Fragment>
      <button
        type="button"
        onClick={() => {
          modalContext.openModal({
            variant: 'SUCCESS',
            animationType: 'fade',
            component: ModalContent,
          });
        }}
      >
        Open Modal
      </button>
    </React.Fragment>
  )
}

export default Dialog
```

## API
To use the modal you need `useModalContext` hook. This hook returns an object that has 3 things:

1. `openModal`: Function
2. `closeModal`: Function
3. `currentModalId`: Zero Positive Integer value

#### `openModal`
```js
modalContext.openModal({
  variant: ['SUCCESS', 'ERROR', 'INFO', 'WARNING'],
  animationType: ['fade', 'slide-left', 'slide-right'],
  component: ReactComponent,
})
```

A function which is used to open modal from anywhere inside the ModalProvider.

It accepts 3 things:

1. `variant`: A string which defines the scrim color of the modal. It be one of `['SUCCESS', 'ERROR', 'INFO', 'WARNING']`
2. `animationType`: A string which defines the opening animation for a modal. It can be one of ['fade', 'slide-left', 'slide-right']
3. `component`: A valid React component to render inside the Modal Frame component

```js
import { useModalContext } from 'design-system/Modal'

const modalContext = useModalContext()

modalContext.openModal()
```
#### `closeModal`
`modalContext.closeModal({ modalId: Integer })`

A function which is used to close a modal from anywhere inside the ModalProvider.

This function accepts an optional Integer value which the Modal ID to close. If the value is not provided then the modal which was last opened will be closed.

```js
import { useModalContext } from 'design-system/Modal'

const modalContext = useModalContext()

modalContext.closeModal() // closes the last opened modal in the tree

// alternatively you could also do

modalContext.closeModal({ modalId: 2 })
```
#### `currentModalId`
`modalContext.currentModalId`

This is used to basically if there's any modal opened anywhere in the tree of the ModalProvider.

`modalContext.currentModalId === 0` means there's no modal opened
`modalContext.currentModalId > 0` means there is/are modal('s) opened in the tree
