import { mount } from "@cypress/vue";
import Demo from "../../../playground-vue3/App.vue";
import Demo2 from "../../../playground-vue2/App.vue";

describe("Demo vue 3", () => {
  before(() => {
    mount(Demo, {});
  });

  it("Loads the image in simple demo", () => {
    cy.get(".simple-demo")
      .should("have.attr", "src")
      .and("equals", "https://source.unsplash.com/cTXwZgyGzxg/5000x2000");
  });

  it("Loads the responsive images", () => {
    // First should't be loaded, thus don't have a src
    cy.get(".picture-demo")
      .should("have.attr", "src")
      .and("not.equals", "https://cdn-images-1.medium.com/max/800/1*xjGrvQSXvj72W4zD6IWzfg.jpeg");

    // When scrolling should load
    cy.get(".picture-demo")
      .scrollIntoView()
      .should("have.attr", "src")
      .and("equals", "https://cdn-images-1.medium.com/max/800/1*xjGrvQSXvj72W4zD6IWzfg.jpeg");

    // Same for srcset
    cy.get(".srcset-demo")
      .should("have.attr", "src")
      .and("equals", "https://cdn-images-1.medium.com/max/800/1*xjGrvQSXvj72W4zD6IWzfg.jpeg");
  });

  it("Loads progressively an image when using src-placeholder", () => {
    cy.get(".progressive-demo")
      .should("have.attr", "src")
      .and("not.equals", "https://source.unsplash.com/WLUHO9A_xik/5000x2000");

    cy.get(".progressive-demo")
      .scrollIntoView()
      .should("have.attr", "src")
      .and("equals", "https://source.unsplash.com/WLUHO9A_xik/5000x2000");
  });
});
