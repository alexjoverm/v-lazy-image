/**
 * v-lazy-image v1.3.2
 * (c) 2019 Alex Jover Morales <alexjovermorales@gmail.com>
 * @license MIT
 */

var VLazyImageComponent = {
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
      default: function () { return ({}); }
    },
    usePicture: {
      type: Boolean,
      default: false
    }
  },
  inheritAttrs: false,
  data: function () { return ({
    observer: null,
    intersected: false,
    loaded: false,
    notFound: false,
  }); },
  computed: {
    srcImage: function srcImage() {
      if (this.notFound) {
        return this.srcFallback;
      }

      return this.intersected && this.src ? this.src : this.srcPlaceholder;
    },
    srcsetImage: function srcsetImage() {
      if (this.notFound) {
        return false;
      }

      return this.intersected && this.srcset ? this.srcset : false;
    }
  },
  methods: {
    load: function load() {
      if (this.$el.getAttribute("src") !== this.srcPlaceholder) {
        this.loaded = true;
        this.$emit("load");
      }
    },
    error: function error() {
      this.notFound = true;
      this.$emit("error");
    }
  },
  render: function render(h) {
    var img = h("img", {
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
  mounted: function mounted() {
    var this$1 = this;

    if (!"IntersectionObserver" in window) {
      return
    }

    this.observer = new IntersectionObserver(function (entries) {
      if (
        entries[0].isIntersecting ||
        entries[0].isIntersecting === undefined
      ) {
        this$1.intersected = true;
        this$1.observer.disconnect();
        this$1.$emit("intersect");
      }
    }, this.intersectionOptions);

    this.observer.observe(this.$el);
  },
  destroyed: function destroyed() {
    if (!"IntersectionObserver" in window) {
      return
    }

    this.observer.disconnect();
  }
};

var VLazyImagePlugin = {
  install: function (Vue, opts) {
    Vue.component("VLazyImage", VLazyImageComponent);
  }
};

export { VLazyImagePlugin };
export default VLazyImageComponent;
