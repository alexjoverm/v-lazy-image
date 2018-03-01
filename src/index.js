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
    }
  },
  data: () => ({ observer: null, intersected: false, loaded: false }),
  computed: {
    srcImage() {
      return this.intersected ? this.src : this.srcPlaceholder;
    },
    srcsetImage() {
      return this.intersected && "srcset" in this ? this.srcset : false;
    }
  },
  render(h) {
    return h("img", {
      attrs: { src: this.srcImage, srcset: this.srcsetImage },
      class: {
        "v-lazy-image": true,
        "v-lazy-image-loaded": this.loaded
      }
    });
  },
  mounted() {
    this.$el.addEventListener("load", ev => {
      if (this.$el.src === this.src) {
        this.loaded = true;
        this.$emit("load");
      }
    });

    this.observer = new IntersectionObserver(entries => {
      const image = entries[0];
      if (image.isIntersecting) {
        this.intersected = true;
        this.observer.disconnect();
        this.$emit("intersect");
      }
    });

    this.observer.observe(this.$el);
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
