const VLazyImageComponent = {
  props: {
    src: {
      type: String,
      required: true
    },
    srcPlaceholder: {
      type: String,
      default: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    },
    srcFallback: {
      type: String,
      default: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
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
  data: () => ({
    observer: null,
    intersected: false,
    loaded: false,
    notFound: false,
  }),
  computed: {
    srcImage() {
      if (this.notFound) {
        return this.srcFallback;
      }

      return this.intersected && this.src ? this.src : this.srcPlaceholder;
    },
    srcsetImage() {
      if (this.notFound) {
        return false;
      }

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
      this.notFound = true;
      this.$emit("error");
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
      on: {
        load: this.load,
        error: this.error,
      }
    });

    if (!this.usePicture) {
      return img;
    }

    return h(
      "picture",
      { on: { load: this.load } },
      this.intersected ? [ this.$slots.default, img ] : []
    );
  },
  mounted() {
    if (!"IntersectionObserver" in window) {
      return
    }

    this.observer = new IntersectionObserver(entries => {
      if (
        entries[0].isIntersecting ||
        entries[0].isIntersecting === undefined
      ) {
        this.intersected = true;
        this.observer.disconnect();
        this.$emit("intersect");
      }
    }, this.intersectionOptions);

    this.observer.observe(this.$el);
  },
  destroyed() {
    if (!"IntersectionObserver" in window) {
      return
    }

    this.observer.disconnect();
  }
};

export default VLazyImageComponent;

export const VLazyImagePlugin = {
  install: (Vue, opts) => {
    Vue.component("VLazyImage", VLazyImageComponent);
  }
};
