<template>
  <!-- Simple file input for video upload -->
  <div class="uploader">
    <input type="file" accept="video/*" @change="uploadVideo" />
    <span v-if="uploading">{{ uploadProgress }}%</span>
    <span v-if="error" class="error">{{ error }}</span>
  </div>
</template>

<script>
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

export default {
  name: 'VideoUploader',

  data() {
    return {
      uploading: false,
      uploadProgress: 0,
      error: ''
    };
  },

  methods: {
    async uploadVideo(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.uploading = true;
      this.uploadProgress = 0;
      this.error = '';

      try {
        const filename = `videos/${Date.now()}-${file.name}`;
        const videoRef = storageRef(storage, filename);
        const uploadTask = uploadBytesResumable(videoRef, file);
        // from https://firebase.google.com/docs/storage/web/upload-files#monitor_upload_progress 
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadProgress = Math.round(progress);
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            this.error = error.message;
            this.uploading = false;
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              this.uploading = false;
              this.$emit('video-uploaded', downloadURL);
            });
          }
        );
      } catch (error) {
        this.error = error.message;
        this.uploading = false;
      }
    }
  }
};
</script>

<style scoped>
.uploader {
  margin-bottom: 20px;
}

.error {
  color: red;
  margin-left: 10px;
}
</style>
