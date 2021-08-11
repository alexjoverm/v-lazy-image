import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  // render: (h) => h("h2", ["Hoola que tal"]),
  render: (h) => h(App),
}).$mount("#app");
