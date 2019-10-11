# Design System

This is a tiny example of design system and practices with few components.

Table of contents
- [Design System](#design-system)
  - [Setup](#setup)
  - [Build Storybook](#build-storybook)
  - [Publish](#publish)
  - [Directory structure thought process](#directory-structure-thought-process)
  - [Bundling thought process](#bundling-thought-process)
      - [Publishing process](#publishing-process)

Components
  - [Modal](src/molecules/Modal/README.md)


## Setup
Download or clone the repository and run the following commands from the root directory locally

```
yarn
yarn storybook
```

## Build Storybook
```
yarn build-storybook
```

## Publish
This should be part of your CI pipeline
```
npm run publish
```
This creates files array for publishing in `package.json` and then uses `semantic-release` to publish to npm

## Directory structure thought process
The directory structure looks like this
```
design-system
  src
    atoms
    molecules
      Component
        Component.js
        index.js
    tokens
    utils
```
- So if you look closely I'm following the atomic design principles here. This is not the only way to structure but this works out pretty well.
- Things which forms the core of a design system goes into `tokens`. Example: `colors`, `fonts` etc.
- All the things which can be composed out of atoms goes into `molecules`. Example: `Modal`
- All the building blocks goes into `atoms`. Example: `Text`, `Size`, `Space`, `View` etc.



## Bundling thought process
This is pretty interesting thing. Once our design system is ready what should we do to ship it and how do we bundle.

So there are multiple ways to do it and different people follow different things. I've written a whole gist around it. You can read it [here](https://gist.github.com/kamleshchandnani/36118e0cbd7a4af2dd4029e4fa60a66a) if you're curious.

So we should always start thinking about our consumers, how would they import things from our design system.

There are 2 ways:

1. Generate a single bundle and then import in the following way 
```js
import {Text, Modal, Size, Position} from 'design-system'
```
2. Generate bundle per component and import in the following way
```js
import Text from 'design-system/Text'
import Size from 'design-system/Size'
```
I've been using the second approach and really like it because it makes things more specific and you know what you want to import explicitly. Secondly you can also have named and default exports in a very simple way with this approach.
```js
import Text, { MaybeSomeNamedImport } from 'design-system/Text'
import { ModalProvider, useModalContext } from 'design-system/Modal'
```
P.S. This also has some DX improvements since you won't have one big imports for all your components when compared to 
```js
import {Text, Modal, Size, Position} from 'design-system'
``` 

So I've used the second approach here and generating the bundle per component. I'm using rollup here since I also wanted to provide ES version of this `design-system` to the consumers.

Since I'm generating `CommonJS` and `es` versions which means now again I've to deal with my build outputs and imports as well.

So if you look at the [rollup](rollup.config.js) config the way I'm building is that it will iterate through components and generate `cjs/Text.js` and `Text.js` which means ES versions are first class citizens and you can easily do 
```js
import Text from 'design-system/Text'
``` 
and if you want to use the `CommonJS` version you can still import it like this
```js
import Text from 'design-system/cjs/Text'
```
#### Publishing process
All this can be done as part of your CI pipeline. Since all these things are dynamic I also need to generate the `files` array in `package.json` before my publish. And for this purpose there's a node script inside [generatePublishFiles](src/utils/generatePublishFiles.js) which runs in `prepublish` step and then finally I'm using `semantic-release` here which will publish it to `npm` and also creates a `release` on github.
