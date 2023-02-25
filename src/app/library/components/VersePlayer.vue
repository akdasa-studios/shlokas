<template>
  <div
    class="root"
  >
    <ion-icon
      v-if="!playing"
      :icon="playFilled"
      size="large"
      @click="play"
    />
    <ion-icon
      v-else
      :icon="stopFilled"
      size="large"
      @click="stop"
    />
    <ion-progress-bar
      :value="progressValue"
      :type="progressType"
      color="light"
      class="progressBar"
    />
    <audio
      ref="audio"
      :src="audioUri"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, defineProps } from 'vue'
import { useMediaControls } from '@vueuse/core'
import { play as playFilled, stop as stopFilled } from 'ionicons/icons'
import { IonProgressBar , IonIcon } from '@ionic/vue'
import { MediaSession } from '@jofr/capacitor-media-session'
import { DownloadService } from '@/services/DownloadService'

const props = defineProps<{
  uri: string,
  title: string,
  artist: string
}>()

const service = new DownloadService()

const audio         = ref()
const audioUri      = ref('')
const isDownloading = ref(false)
const progressValue = computed(() => currentTime.value / duration.value || 0)
const progressType  = computed(() => isDownloading.value ? 'indeterminate' : 'determinate')
const {
  playing, currentTime, duration
} = useMediaControls(audio, { src: audioUri })

async function play() {
  // Download the audio file if it's not already downloaded
  // and get the local file URI
  isDownloading.value = true
  audioUri.value = await service.download(props.uri)
  isDownloading.value = false

  // Play the audio
  nextTick(() => playing.value = true)

  // Update the media session
  MediaSession.setMetadata({
    title: props.title,
    artist: props.artist,
    // artwork is not working on iOS for some reason :(
    // artwork: [
    //   { src: 'https://dummyimage.com/512x512', sizes: '512x512', type: 'image/png' },
    // ]
  })
}

function stop() { playing.value = false }
</script>


<style lang="scss" scoped>
.root {
  background-color: var(--ion-color-dark);
  color: var(--ion-color-medium-contrast);
  padding: .5rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-items: baseline;
}

.progressBar {
  margin-left: .5rem;
  margin-right: .5rem;
}
</style>