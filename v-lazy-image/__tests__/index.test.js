import { mount } from "@vue/test-utils";
import Component from "../index";

describe("v-lazy-image", () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn(() => ({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    }));
  });

  test("plain img can be created", () => {
    const wrapper = mount(Component, {
      propsData: {
        src: "http://lorempixel.com/400/200/",
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
  test("using picture can be created", () => {
    const wrapper = mount(Component, {
      propsData: {
        src: "http://lorempixel.com/400/200/",
        usePicture: true,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});

// test("picture renders correctly", () => {
//   let intersect;
//   global.IntersectionObserver = function (cb) {
//     intersect = cb;
//     return {
//       observe: () => {},
//       disconnect: () => {},
//     };
//   };
//   let source = '<source srcset="test" />';
//   const wrapper = shallowMount(Component, {
//     slots: {
//       default: [source, source],
//     },
//     propsData: {
//       src: "http://lorempixel.com/400/200/",
//       srcset: "image-320w.jpg 320w, image-480w.jpg 480w",
//       sizes: "(max-width: 320px) 280px, 440px",
//       alt: "Test",
//       usePicture: true,
//     },
//   });
//   intersect([{ isIntersecting: true }]);
//   expect(wrapper.element).toMatchSnapshot();
// });

// test("picture element lazy loads", () => {
//   let intersect;
//   global.IntersectionObserver = function (cb) {
//     intersect = cb;
//     return {
//       observe: () => {},
//       disconnect: () => {},
//     };
//   };
//   let source = '<source srcset="test" />';
//   let src = "http://lorempixel.com/400/200/";
//   const wrapper = shallowMount(Component, {
//     slots: {
//       default: [source, source],
//     },
//     propsData: {
//       src,
//       usePicture: true,
//     },
//   });
//   expect(wrapper.vm.intersected).toBe(false);
//   expect(wrapper.isEmpty()).toBe(true);
//   intersect([{ isIntersecting: true }]);
//   let imgWrapper = wrapper.find("img");
//   expect(imgWrapper.is("img")).toBe(true);
//   expect(wrapper.vm.intersected).toBe(true);
//   expect(imgWrapper.attributes("src")).toBe(src);
// });
