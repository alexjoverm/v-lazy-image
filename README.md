# v-lazy-image

A Vue.js component to lazy load an image automatically when it enters the viewport using using the Intersection Observer API.

**Demos:**

* [Simple demo](https://codesandbox.io/s/r5wmj970wm)
* [Progressive image loading with animations](https://codesandbox.io/s/l4vxvmpqym)

## Usage

```bash
npm install v-lazy-image
```

_**Warning:** You'll need to install the [w3c Intersection Observer polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) in case you're targeting a browser which doesn't support it._

You can register globally the component so its available in all your app:

```js
import Vue from "vue";
import { VLazyImage } from "v-lazy-image";

Vue.use(VLazyImage);
```

Or use it locally in any of your components:

```js
import VLazyImage from "v-lazy-image";

export default {
  components: {
    VLazyImage
  }
};
```

You must pass a `src` property with the link of the image:

```html
<template>
  <v-lazy-image src="http://lorempixel.com/400/200/"></v-lazy-image>
</template>
```

That image will be loaded as soon as the image enters the viewport.

## Progressive loading

You can use the `src-placeholder` property to define an image that is shown until the `src` image is loaded.

When the `src` image is loaded, a `v-lazy-image-loaded` class is added, so you can use it to perform animations. For example, a blur effect:

```html
<template>
  <div>
    <v-lazy-image
      src="https://cdn-images-1.medium.com/max/1600/1*xjGrvQSXvj72W4zD6IWzfg.jpeg"
      src-placeholder="https://cdn-images-1.medium.com/max/80/1*xjGrvQSXvj72W4zD6IWzfg.jpeg"
      ></v-lazy-image>
  </div>
</template>

<style scoped>
.v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>
```

## Other Props

You can pass any img attribute, such as `alt`, and they'll be added to the rendered `<img>` tag.
