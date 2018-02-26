# v-lazy-image

A Vue.js component to lazy load an image automatically when it enters the viewport using using the Intersection Observer API.

**Play with the demo**

_**Warning:** You'll need to install the [w3c Intersection Observer polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) in case you're targeting a browser which doesn't support it_

## Usage

```bash
npm install v-lazy-image
```

You can register globally the component so its available in all your app:

```js
import Vue from 'vue'
import { VLazyImage } from 'v-lazy-image

Vue.use(VLazyImage);
```

Or use it locally in any of your components:

```js
import VLazyImage from 'v-lazy-image

export default {
  components: {
    VLazyImage
  }
}
```

You must pass a `src` property with the link of the image:

```html
<template>
  <v-lazy-image src="http://lorempixel.com/400/200/"></v-lazy-image>
</template>
```

That image will be loaded as soon as the image enters the viewport.

## Props

Since `v-lazy-image` is using directly a `<img>` as its child, you can pass any image attribute like `alt`.

##
