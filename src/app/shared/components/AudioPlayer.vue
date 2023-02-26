<template>
  <audio
    ref="audioRef"
    :src="store.uri.value"
    :loop="store.loop.value"
  />
</template>


<script lang="ts" setup>
import { useMediaControls, syncRef } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { MediaSession } from '@jofr/capacitor-media-session'
import { useAudioPlayerStore } from '@/app/shared'

const audioRef = ref()
const store = storeToRefs(useAudioPlayerStore())
const player = useMediaControls(audioRef, { src: store.uri })

// If the audio file changes, stop the player
watch(store.uri, () => { player.playing.value = false })

// If the title or artist changes, update the media session
// TODO: artwork is not working on iOS for some reason
//       https://github.com/akdasa-studios/shlokas/issues/174
watch([store.title, store.artist], () => {
  MediaSession.setMetadata({
    title: store.title.value,
    artist: store.artist.value,
    // artwork: [
    //   { src: 'https://dummyimage.com/512x512', sizes: '512x512', type: 'image/png' },
    // ]
  })
})

// Sync the player state with the store and vice versa
syncRef(store.playing, player.playing)
syncRef(store.duration, player.duration, { direction: 'rtl' })
syncRef(store.time, player.currentTime, { direction: 'rtl' })
</script>


<doc lang="md">
# AudioPlayer
Global audio player component. This component is used to play audio files in the
app. It is a wrapper around the `<audio>` tag. It controlled by `audioPlayer`
store.

## Usage
1. Put the component somewhere in the app. For example, in `App.vue`:
```html
<template>
  <ion-app>
    <ion-router-outlet></ion-router-outlet>
    <AudioPlayer />
  </ion-app>
</template>
```

2. Use the `useAudioPlayerStore` store to control the player:
```ts
const player = useAudioPlayerStore()
player.open(uri, title, artist)
```
</doc>

