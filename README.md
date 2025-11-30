# Vue.js + Video.js Example

A complete example of integrating Video.js with Vue 3 using Vite.


## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown (usually http://localhost:5173)


## Using with Your Own Video

Edit the `videoOptions` in [src/App.vue](src/App.vue) to use your own video source:

```javascript
videoOptions: {
  autoplay: false,
  controls: true,
  preload: 'auto',
  fluid: true,
  sources: [
    {
      src: '/path/to/your/video.mp4',
      type: 'video/mp4'
    }
  ]
}
```

## Video.js Documentation

For more options and features, see the [Video.js documentation](https://docs.videojs.com/).
