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
    className: {
      type: String,
      default: "v-lazy-image"
    },
    classNameLoaded: {
      type: String,
      default: "v-lazy-image-loaded"
    }
  },
  data: () => ({ observer: null, intersected: false, loaded: false }),
  computed: {
    srcImage() {
      return this.intersected ? this.src : this.srcPlaceholder;
    }
  },
  render(h) {
    return h("img", {
      attrs: { src: this.srcImage },
      class: {
        [this.className]: true,
        [this.classNameLoaded]: this.loaded
      }
    });
  },
  mounted() {
    this.$el.addEventListener("load", ev => {
      if (this.$el.src === this.src) {
        this.loaded = true;
      }
    });

    this.observer = new IntersectionObserver(entries => {
      const image = entries[0];
      if (image.isIntersecting) {
        this.intersected = true;
        this.observer.disconnect();
      }
    });

    this.observer.observe(this.$el);
  },
  destroyed() {
    this.observer.disconnect();
  }
};

export default VLazyImageComponent;

export const VLazyImage = {
  install: (Vue, opts) => {
    Vue.component("VLazyImage", VLazyImageComponent);
  }
};
