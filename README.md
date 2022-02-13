# v-lazy-image

[![npm](https://img.shields.io/npm/v/v-lazy-image.svg)](https://www.npmjs.com/package/v-lazy-image)
[![npm](https://img.shields.io/npm/dm/v-lazy-image.svg)](https://www.npmjs.com/package/v-lazy-image)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg)](https://paypal.me/AJoverMorales)

A Vue.js component to lazy load an image automatically when it enters the viewport using the [Intersection Observer API](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API).

> ⚠️ Check the **[practical examples and demos](https://vuedose.tips/lazy-loading-images-with-v-lazy-image)** if you are creating a real-world or enterprise project and see how to **achieve max performance** using responsive images and progressive image loading.

## Usage

```bash
npm install v-lazy-image
```

_**Warning:** You'll need to install the [w3c Intersection Observer polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) in case you're targeting a browser which doesn't support it._

For **Vue 3**, import it and use it like any other component:

```html
<script setup>
  import VLazyImage from "v-lazy-image";
</script>
```

For **Vue 2**, import it from `v-lazy-image/v2`:

```js
import VLazyImage from "v-lazy-image/v2";

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

That easy, the image will be loaded as soon as it enters the viewport. **[See it running in this demo](https://vuedose.tips/lazy-loading-images-with-v-lazy-image)** and you'll learn how to use Chrome DevTools to check how it's loaded.

## Achieving Max Performance

Just by using `v-lazy-image` you'll have a performance gain, since the image will be loaded when it's going to be seen.

But you can go to the next level and squeeze your web's performance if you use the next techniques.

### Responsive Images

`v-lazy-image` allows you to use Web Standard's: the `srcset` attribute on images and the `<picture>` tag.

["Use Responsive Images with v-lazy-image"](https://vuedose.tips/use-responsive-images-with-v-lazy-image) shows you how simple it is and see it in action in a demo.

### Progressive Image Loading

A technique used by platforms like Spotify, Netflix or Medium to improve Perceived Performance, thus the User Experience.

In ["Achieve Max Performance loading your images with v-lazy-image"](https://vuedose.tips/achieve-max-performance-loading-your-images-with-v-lazy-image) you'll see what's progressive image loading about, how to apply it in `v-lazy-image` using the `src-placeholder` attribute and a demo to see how it plays with a CSS animation.

## API

Aside from the following API, you can pass any _img_ attribute, such as `alt`, and they'll be added to the rendered `<img>` tag.

_Fields marked as (\*) are required._

### Props

| Name                   | Type          | Default    | Description                                                                                                                                               |
| ---------------------- | ------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src`                  | String _(\*)_ | -          | Image `src` to lazy load when it intersects with the viewport                                                                                             |
| `src-placeholder`      | String        | ' '        | If defined, it will be shown until the `src` image is loaded. <br> Useful for progressive image loading, [see demo](https://codesandbox.io/s/9l3n6j5944)  |
| `srcset`               | String        | -          | Images to be used for different resolutions                                                                                                               |
| `intersection-options` | Object        | () => ({}) | The [Intersection Observer options object](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer). |
| `use-picture`          | Boolean       | false      | Wrap the img in a picture tag.                                                                                                                            |

### Events

| Name        | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `intersect` | Triggered when the image intersects the viewport             |
| `load`      | Triggered when the lazy image defined in `src` is loaded     |
| `error`     | Triggered when the lazy image defined in `src` fails to load |

<!-- 
* [Simple demo](https://codesandbox.io/s/r5wmj970wm)
* [Responsive images](https://codesandbox.io/s/k2kp64qkq7), by [@aarongarciah](https://twitter.com/aarongarciah)
* [Progressive image loading with animations](https://codesandbox.io/s/9l3n6j5944), by [@aarongarciah](https://twitter.com/aarongarciah)
* [Performant progressive blur using SVG](https://codesandbox.io/s/2ox0z4ymop)

## Progressive Loading
