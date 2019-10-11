# Requirements

- The Modal Frame Components

  - `Card` (configurable height and width)
  - `Panel` (A card with a max-width and 100% height, located on the left or right of page)
  - Configurable `X` button (close button) within the frame to close the Modal

- The Modal "scrim" supports these color states

  - A scrim is the background behind the modal. It is blurred and darkened for a 3D effect to get more visual contrast and make the background recede visually.
  - `SUCCESS` (green)
  - `ERROR` (red)
  - `INFO` (blue)
  - `WARNING` (yellow)

- Modal must have `open` and `close` functionality accessible from any component in a React component tree

  - Modal can be opened with a Component to render inside the Modal Frame
  - Modal is closed on route changes
  - API to determine if there is a Modal showing

- Modal can be opened from different positions

  - Center
  - Center Top
  - Center Bottom
  - Full Screen

- Support 3 types of `animation` styles for Modal `open`/`close`

- Multiple Modals can be opened and are closed LIFO (last in first out)

  - `close` functionality closes the latest modal in the stack
  - Can close a specific modal in the stack

- With the Modal component in place, build a Modal Abstraction that easily opens a Confirmation Modal

  - Confirmation Button
  - Cancel

- Storybook stories representing different requirements
