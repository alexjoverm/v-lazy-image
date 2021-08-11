<template>
  <div id="app">
    <h3>Hello</h3>
    <div class="photo-wrap">
      <v-lazy-image
        src="https://source.unsplash.com/WLUHO9A_xik/5000x2000"
        src-placeholder="https://source.unsplash.com/WLUHO9A_xik/50x20"
      ></v-lazy-image>
    </div>
    <div class="photo-wrap">
      <v-lazy-image
        src="https://source.unsplash.com/cTXwZgyGzxg/5000x2000"
        src-placeholder="https://source.unsplash.com/cTXwZgyGzxg/50x20"
      ></v-lazy-image>
    </div>
  </div>
</template>

<script>
import VLazyImage from "../lib/index";

export default {
  name: "App",
  components: { VLazyImage },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.photo-wrap {
  width: 100%;
  max-width: 500px;
}
.photo-wrap img {
  width: 100%;
}
</style>
