import { reactive, h, computed, ref, onMounted, onBeforeUnmount, defineComponent } from "vue";

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
    srcPlaceholder: {
      type: String,
      default: "data:,",
    },
    srcset: {
      type: String,
    },
    intersectionOptions: {
      type: Object,
      default: () => ({}),
    },
    usePicture: {
      type: Boolean,
      default: false,
    },
  },
  inheritAttrs: false,
  setup(props, { attrs, slots, emit }) {
    const root = ref(null);
    const state = reactive({ observer: null, intersected: false, loaded: false });

    // Computed
    const srcImage = computed(() =>
      state.intersected && props.src ? props.src : props.srcPlaceholder
    );
    const srcsetImage = computed(() => (state.intersected && props.srcset ? props.srcset : false));

    // Methods
    const load = () => {
      if (root.value.getAttribute("src") !== props.srcPlaceholder) {
        state.loaded = true;
        emit("load");
      }
    };
    const error = () => emit("error", root.value);

    // Hooks
    onMounted(() => {
      if ("IntersectionObserver" in window) {
        state.observer = new IntersectionObserver((entries) => {
          const image = entries[0];
          if (image.isIntersecting) {
            state.intersected = true;
            state.observer.disconnect();
            emit("intersect");
          }
        }, props.intersectionOptions);

        console.log(root.value);
        state.observer.observe(root.value);
      }
    });

    onBeforeUnmount(() => {
      if ("IntersectionObserver" in window) {
        state.observer.disconnect();
      }
    });

    return () => {
      const img = h("img", {
        ref: root,
        src: srcImage.value,
        srcset: srcsetImage.value || null, // set to null explicitly if falsy
        ...attrs,
        class: [{ "v-lazy-image": true }, { "v-lazy-image-loaded": state.loaded }],
        onLoad: load,
        onError: error,
      });

      return props.usePicture
        ? h(
            "picture",
            { ref: root, on: { load } },
            state.intersected ? [slots.default, img] : [img]
          )
        : img;
    };
  },
});
