<template>
  <div id="app">
    <h1>Vue + Video.js & Firebase CloudStorage Example</h1>

    <Auth @user-changed="handleUserChanged" />

    <div v-if="user">
      <!-- Video Uploader -->
       <!-- it will trigger handleVideoUploaded method in App.vue when a new video is uploaded -->
      <VideoUploader @video-uploaded="handleVideoUploaded" />

      <div class="video-container">
        <VideoPlayer :options="videoOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from './components/VideoPlayer.vue';
import VideoUploader from './components/VideoUploader.vue';
import Auth from './components/Auth.vue';

export default {
  name: 'App',
  components: {
    VideoPlayer,
    VideoUploader,
    Auth
  },
  data() {
    return {
      user: null,
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
  },
  methods: {
    handleUserChanged(user) {
      this.user = user;
    },
    handleVideoUploaded(videoUrl) {
      // update the video source when a new video is uploaded
      this.videoOptions.sources = [
        {
          src: videoUrl,
          type: 'video/mp4'
        }
      ];

      // remove poster when playing uploaded video
      this.videoOptions.poster = '';
    }
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
