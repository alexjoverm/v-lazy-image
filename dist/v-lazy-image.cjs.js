/**
 * v-lazy-image v1.3.2
 * (c) 2019 Alex Jover Morales <alexjovermorales@gmail.com>
 * @license MIT
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var VLazyImageComponent = {
  props: {
    src: {
      type: String,
      required: true
    },
    srcPlaceholder: {
      type: String,
      default: '//:0'
    },
    srcset: {
      type: String
    },
    intersectionOptions: {
      type: Object,
      default: function () { return ({}); }
    },
    usePicture: {
      type: Boolean,
      default: false
    }
  },
  inheritAttrs: false,
  data: function () { return ({ observer: null, intersected: false, loaded: false }); },
  computed: {
    srcImage: function srcImage() {
      return this.intersected && this.src ? this.src : this.srcPlaceholder;
    },
    srcsetImage: function srcsetImage() {
      return this.intersected && this.srcset ? this.srcset : false;
    }
  },
  watch: {
    src: function src(newSrc, oldSrc) {
      if ('IntersectionObserver' in window) {
        this.intersected = false;
        this.observer.observe(this.$el);
      }
    }
  },
  methods: {
    load: function load() {
      if (this.$el.getAttribute('src') !== this.srcPlaceholder) {
        this.loaded = true;
        this.$emit('load');
      }
    }
  },
  render: function render(h) {
    var img = h('img', {
      attrs: {
        src: this.srcImage,
        srcset: this.srcsetImage
      },
      domProps: this.$attrs,
      class: {
        'v-lazy-image': true,
        'v-lazy-image-loaded': this.loaded
      },
      on: { load: this.load }
    });
    if (this.usePicture) {
      return h(
        'picture',
        { on: { load: this.load } },
        this.intersected ? [this.$slots.default, img] : []
      );
    } else {
      return img;
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(function (entries) {
        var image = entries[0];
        if (image.isIntersecting) {
          this$1.intersected = true;
          this$1.observer.disconnect();
          this$1.$emit('intersect');
        }
      }, this.intersectionOptions);
      this.observer.observe(this.$el);
    }
  },
  destroyed: function destroyed() {
    if ('IntersectionObserver' in window) {
      this.observer.disconnect();
    }
  }
};

var VLazyImagePlugin = {
  install: function (Vue, opts) {
    Vue.component('VLazyImage', VLazyImageComponent);
  }
};

exports['default'] = VLazyImageComponent;
exports.VLazyImagePlugin = VLazyImagePlugin;
