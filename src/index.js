const VLazyImageComponent = {
  props: {
    src: {
      type: String,
      required: true
    },
    srcPlaceholder: {
      type: String,
      default: ""
    },
    srcset: {
      type: String
    },
    intersectionOptions: {
      type: Object,
      default: () => ({})
    },
    usePicture: {
      type: Boolean,
      default: false
    }
  },
  inheritAttrs: false,
  data: () => ({ observer: null, intersected: false, loaded: false }),
  computed: {
    srcImage() {
      return this.intersected ? this.src : this.srcPlaceholder;
    },
    srcsetImage() {
      return this.intersected && this.srcset ? this.srcset : false;
    }
  },
  methods: {
    load() {
      if (this.$el.getAttribute("src") !== this.srcPlaceholder) {
        this.loaded = true;
        this.$emit("load");
      }
    }
  },
  render(h) {
    let img = h("img", {
      attrs: {
        src: this.srcImage,
        srcset: this.srcsetImage
      },
      domProps: this.$attrs,
      class: {
        "v-lazy-image": true,
        "v-lazy-image-loaded": this.loaded
      },
      on: { load: this.load }
    });
    if (this.usePicture) {
      return h("picture", { on: { load: this.load } }, this.intersected ? [ this.$slots.default, img ] : [] );
    } else {
      return img;
    }
  },
  mounted() {
    if ("IntersectionObserver" in window) {
      this.observer = new IntersectionObserver(entries => {
        const image = entries[0];
        if (image.isIntersecting) {
          this.intersected = true;
          this.observer.disconnect();
          this.$emit("intersect");
        }
      }, this.intersectionOptions);
      this.observer.observe(this.$el);
    } else {
      console.error(
        "v-lazy-image: this browser doesn't support IntersectionObserver. Please use this polyfill to make it work https://github.com/w3c/IntersectionObserver/tree/master/polyfill."
      );
    }
  },
  destroyed() {
    this.observer.disconnect();
  }
};

export default VLazyImageComponent;

export const VLazyImagePlugin = {
  install: (Vue, opts) => {
    Vue.component("VLazyImage", VLazyImageComponent);
  }
};
