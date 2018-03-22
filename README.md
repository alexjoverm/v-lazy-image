# v-lazy-image

[![npm](https://img.shields.io/npm/v/v-lazy-image.svg)](https://www.npmjs.com/package/v-lazy-image)
[![npm](https://img.shields.io/npm/dm/v-lazy-image.svg)](https://www.npmjs.com/package/v-lazy-image)


A Vue.js component to lazy load an image automatically when it enters the viewport using the [Intersection Observer API](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API).

Check out the fundaments on how it's built in [this Alligator.io article](https://alligator.io/vuejs/lazy-image/).

### Demos

* [Simple demo](https://codesandbox.io/s/r5wmj970wm)
* [Responsive images](https://codesandbox.io/s/k2kp64qkq7), by [@aarongarciah](https://twitter.com/aarongarciah)
* [Progressive image loading with animations](https://codesandbox.io/s/9l3n6j5944), by [@aarongarciah](https://twitter.com/aarongarciah)
* [Performant progressive blur using SVG](https://codesandbox.io/s/2ox0z4ymop)

## Usage

```bash
npm install v-lazy-image
```

_**Warning:** You'll need to install the [w3c Intersection Observer polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) in case you're targeting a browser which doesn't support it._

You can register the component globally so it's available in all your apps:

```js
import Vue from "vue";
import { VLazyImagePlugin } from "v-lazy-image";

Vue.use(VLazyImagePlugin);
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

You must pass an `src` property with the link of the image:

```html
<template>
  <v-lazy-image src="http://lorempixel.com/400/200/" />
</template>
```

That image will be loaded as soon as the image enters the viewport.

## Progressive Loading

You can use the `src-placeholder` property to define an image that is shown until the `src` image is loaded.

When the `src` image is loaded, a `v-lazy-image-loaded` class is added, so you can use it to perform animations. For example, a blur effect:

```html
<template>
  <v-lazy-image
    src="https://cdn-images-1.medium.com/max/1600/1*xjGrvQSXvj72W4zD6IWzfg.jpeg"
    src-placeholder="https://cdn-images-1.medium.com/max/80/1*xjGrvQSXvj72W4zD6IWzfg.jpeg"
    />
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

You could listen to the `intersect` and `load` events for more complex animations and state handling:

```html
<template>
  <v-lazy-image
    src="https://cdn-images-1.medium.com/max/1600/1*xjGrvQSXvj72W4zD6IWzfg.jpeg"
    src-placeholder="https://cdn-images-1.medium.com/max/80/1*xjGrvQSXvj72W4zD6IWzfg.jpeg"
    @intersect="..."
    @load="..."
    />
</template>
```

[@jmperezperez](https://twitter.com/jmperezperez) has written about the [progressive loading technique](https://jmperezperez.com/more-progressive-image-loading/) on his blog, in case you want a deeper explanation.

## Responsive Images

Using the `srcset` property you can set images for different resolutions:

```html
<template>
  <v-lazy-image
    srcset="image.jpg 1x, image_2x.jpg 2x"
    />
</template>
```

When using the `srcset` attribute is recommended to use also `src` as a fallback for browsers that doesn't support the `srcset` and `sizes` attributes:

```html
<template>
  <v-lazy-image
    srcset="image-320w.jpg 320w, image-480w.jpg 480w"
    sizes="(max-width: 320px) 280px, 440px"
    src="image-480w.jpg"
  />
</template>
```

The `srcset` prop is combinable with `src-placeholder` in order to apply progressive loading.

## API

Aside from the following API, you can pass any *img* attribute, such as `alt`, and they'll be added to the rendered `<img>` tag.

_Fields marked as (\*) are required._

### Props

| Name                   | Type          | Description                                                                                                                                               |
| ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src`                  | String _(\*)_ | Image `src` to lazy load when it intersects with the viewport                                                                                             |
| `src-placeholder`      | String        | If defined, it will be shown until the `src` image is loaded. <br> Useful for progressive image loading, [see demo](https://codesandbox.io/s/9l3n6j5944)  |
| `srcset`               | String        | Images to be used for different resolutions                                                                                                               |
| `intersection-options` | Object        | The [Intersection Observer options object](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer). |

### Events

| Name        | Description                                              |
| ----------- | -------------------------------------------------------- |
| `intersect` | Triggered when the image intersects the viewport         |
| `load`      | Triggered when the lazy image defined in `src` is loaded |
