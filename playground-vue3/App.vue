<template>
  <div>
    <div class="space"></div>
    <h2>Simple Demo</h2>
    <div class="photo-wrap">
      <v-lazy-image src="https://source.unsplash.com/cTXwZgyGzxg/5000x2000"></v-lazy-image>
    </div>

    <div class="space"></div>
    <h2>Responsive Image</h2>
    <h4>(with picture and sizes )</h4>
    <div class="photo-wrap">
      <v-lazy-image
        srcset="
        https://cdn-images-1.medium.com/max/400/1*xjGrvQSXvj72W4zD6IWzfg.jpeg 400w,
        https://cdn-images-1.medium.com/max/800/1*xjGrvQSXvj72W4zD6IWzfg.jpeg 800w
        https://cdn-images-1.medium.com/max/1600/1*xjGrvQSXvj72W4zD6IWzfg.jpeg 1600w
      "
        sizes="(max-width: 150px) 200px, 400px, 800p"
        src="https://cdn-images-1.medium.com/max/800/1*xjGrvQSXvj72W4zD6IWzfg.jpeg"
        use-picture
      />
    </div>

    <h4>(only srcset )</h4>
    <div class="photo-wrap">
      <v-lazy-image
        srcset="
        https://cdn-images-1.medium.com/max/800/1*xjGrvQSXvj72W4zD6IWzfg.jpeg,
        https://cdn-images-1.medium.com/max/1200/1*xjGrvQSXvj72W4zD6IWzfg.jpeg 1.5x,
        https://cdn-images-1.medium.com/max/1600/1*xjGrvQSXvj72W4zD6IWzfg.jpeg 2x
      "
        src="https://cdn-images-1.medium.com/max/800/1*xjGrvQSXvj72W4zD6IWzfg.jpeg"
      />
    </div>

    <div class="space"></div>
    <h2>Progressive Rendering - Blur effect</h2>
    <div class="photo-wrap">
      <v-lazy-image
        src="https://source.unsplash.com/WLUHO9A_xik/5000x2000"
        src-placeholder="https://source.unsplash.com/WLUHO9A_xik/50x20"
      ></v-lazy-image>
    </div>

    <div class="space"></div>
    <h2>Progressive Rendering - Blur effect SVG</h2>
    <div class="photo-wrap">
      <v-lazy-image
        src="https://source.unsplash.com/rtAkRV_kmY4/5000x2000"
        src-placeholder="https://source.unsplash.com/rtAkRV_kmY4/50x20"
      ></v-lazy-image>
    </div>
  </div>
</template>

<script setup>
import VLazyImage from "v-lazy-image";
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
