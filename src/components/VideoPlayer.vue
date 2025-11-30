
<template>
  <div>
    <video ref="videoPlayer" class="video-js vjs-default-skin"></video>

    <!-- Add Marker Form -->
    <form @submit.prevent="addMarker" class="marker-form">
      <label>Time (seconds):</label>
      <input v-model.number="newMarker.time" type="number" min="0" required />

      <label>Label:</label>
      <input v-model="newMarker.text" type="text" required />

      <button type="submit">Add Marker</button>
    </form>

    <!-- Chapters Dropdown -->
    <div class="chapters-container">
      <label for="chapters">Chapters:</label>
      <select id="chapters" @change="jumpToChapter($event)">
        <option disabled selected value="">Select a chapter...</option>

        <option 
          v-for="(m, index) in markers"
          :key="index"
          :value="m.time"
        >
          {{ formatTime(m.time) }} - {{ m.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";

// videojs-markers plugin
import "videojs-markers";
import "videojs-markers/dist/videojs.markers.css";

export default {
  name: "VideoPlayer",

  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data() {
    return {
      player: null,
      markers: [],

      newMarker: {
        time: 0,
        text: ""
      }
    };
  },

  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      console.log("Video ready");

      // Initialize plugin with tooltip enabled
      this.player.markers({
        markers: [],
        markerStyle: {
          width: "7px",
          "border-radius": "30%",
          "background-color": "red"
        },
        markerTip: {
          display: true,               // ⬅ ENABLE HOVER TOOLTIP
          text: marker => marker.text  // ⬅ Show the text you entered
        }
      });
    });
  },

  methods: {
    addMarker() {
      const markerData = {
        time: this.newMarker.time,
        text: this.newMarker.text
      };

      // Add to Video.js plugin
      this.player.markers.add([markerData]);

      // Add to dropdown list
      this.markers.push(markerData);

      // Reset form
      this.newMarker.time = 0;
      this.newMarker.text = "";
    },

    jumpToChapter(event) {
      const time = Number(event.target.value);
      if (!isNaN(time) && this.player) {
        this.player.currentTime(time);
      }
    },

    formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
      return `${mins}:${secs}`;
    }
  },

  beforeUnmount() {
    if (this.player) this.player.dispose();
  }
};
</script>

<style scoped>
.video-js {
  width: 100%;
  height: auto;
}

.marker-form {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.chapters-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

select {
  padding: 6px;
  margin-top: 5px;
}
</style>
