<template>
  <div>
    <h2>Hola</h2>
    <div class="space"></div>
    <div class="photo-wrap">
      <v-lazy-image
        src="https://source.unsplash.com/WLUHO9A_xik/5000x2000"
        src-placeholder="https://source.unsplash.com/WLUHO9A_xik/50x20"
      ></v-lazy-image>
    </div>
    <div class="space"></div>
    <div class="photo-wrap">
      <v-lazy-image
        src="https://source.unsplash.com/cTXwZgyGzxg/5000x2000"
        src-placeholder="https://source.unsplash.com/cTXwZgyGzxg/50x20"
      ></v-lazy-image>
    </div>

    <div class="space"></div>
    <div class="photo-wrap">
      <v-lazy-image
        src="https://source.unsplash.com/BvxURox-57o/5000x2000"
        src-placeholder="https://source.unsplash.com/BvxURox-57o/50x20"
      ></v-lazy-image>
    </div>

    <div class="space"></div>
    <div class="photo-wrap">
      <v-lazy-image
        src="https://source.unsplash.com/rtAkRV_kmY4/5000x2000"
        src-placeholder="https://source.unsplash.com/rtAkRV_kmY4/50x20"
      ></v-lazy-image>
    </div>

    <div class="space"></div>
    <div class="photo-wrap">
      <v-lazy-image
        src="https://source.unsplash.com/pXuzLY_OaHM/5000x2000"
        src-placeholder="https://source.unsplash.com/pXuzLY_OaHM/50x20"
      ></v-lazy-image>
    </div>
  </div>
</template>

<script setup>
import VLazyImage from "../v-lazy-image/index";
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
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
.space {
  width: 1px;
  height: 220px;
}
</style>
