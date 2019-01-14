import { shallowMount } from "@vue/test-utils";
import Component from "../index";

test('img renders correctly', () => {
  let intersect;
  global.IntersectionObserver = function(cb) {
    intersect = cb;
    return {
      observe: () => {},
      disconnect: () => {}
    };
  };
  const wrapper = shallowMount(
    Component,
    {
      propsData: {
        src: "http://lorempixel.com/400/200/",
      }
    }
  );
  intersect([
    { isIntersecting: true }
  ]);
  expect(wrapper.element).toMatchSnapshot();
});

test('picture renders correctly', () => {
  let intersect;
  global.IntersectionObserver = function(cb) {
    intersect = cb;
    return {
      observe: () => {},
      disconnect: () => {}
    };
  };
  const wrapper = shallowMount(
    Component,
    {
      propsData: {
        src: "http://lorempixel.com/400/200/",
        srcset: "image-320w.jpg 320w, image-480w.jpg 480w",
        sizes: "(max-width: 320px) 280px, 440px",
        alt: "Test",
        usePicture: true
      }
    }
  );
  intersect([
    { isIntersecting: true }
  ]);
  expect(wrapper.element).toMatchSnapshot();
});
