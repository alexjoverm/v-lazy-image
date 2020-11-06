const VLazyImageComponent = {
  props: {
    src: {
      type: String,
      required: true
    },
    srcPlaceholder: {
      type: String,
      default: "data:,"
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
      return this.intersected && this.src ? this.src : this.srcPlaceholder;
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
    },
    error() {
      this.$emit("error", this.$el)
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
      on: { load: this.load, error: this.error }
    });
    if (this.usePicture) {
      return h(
        "picture",
        { on: { load: this.load } },
        this.intersected ? [this.$slots.default, img] : [img]
      );
    } else {
      return img;
    }
  },
  mounted() {
    if ("IntersectionObserver" in window) {
      this.observer = new IntersectionObserver(entries => {
        // Use `intersectionRatio` because of Edge 15's
        // lack of support for `isIntersecting`.
        // See: https://github.com/w3c/IntersectionObserver/issues/211
        if (entries.some(e => e.isIntersecting || e.intersectionRatio > 0)) {
          this.intersected = true;
          this.observer.disconnect();
          this.$emit("intersect");
        }
      }, this.intersectionOptions);
      this.observer.observe(this.$el);
    }
  },
  destroyed() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
};

export default VLazyImageComponent;

export const VLazyImagePlugin = {
  install: (Vue, opts) => {
    Vue.component("VLazyImage", VLazyImageComponent);
  }
};
