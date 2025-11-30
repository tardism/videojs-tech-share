<template>
  <div id="app">
    <h1>Vue.js + Video.js Example</h1>
    <div class="video-container">
      <VideoPlayer :options="videoOptions" />
    </div>
  </div>
</template>

<script>
import VideoPlayer from './components/VideoPlayer.vue';



export default {
  name: 'App',
  components: {
    VideoPlayer
  },
  data() {
    return {
      videoOptions: {
        autoplay: false,
        controls: true,
        preload: 'auto',
        fluid: true,
        sources: [
          {
            src: 'https://vjs.zencdn.net/v/oceans.mp4',
            type: 'video/mp4'
          }
        ],
        poster: 'https://vjs.zencdn.net/v/oceans.png'
      }
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #42b983;
}

.video-container {
  margin-top: 20px;
}
</style>
