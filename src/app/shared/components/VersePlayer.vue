<template>
  <div
    class="root"
    @click.stop="play"
  >
    <ion-icon
      v-if="!playing"
      :icon="playFilled"
      size="large"
      color="dark"
      @click.stop="play"
    />
    <ion-icon
      v-else
      :icon="stopFilled"
      color="dark"
      size="large"
      @click.stop="stop"
    />
    <ion-icon
      v-if="props.showRepeatButton"
      :icon="repeatIcon"
      size="large"
      :color="isLooped ? 'primary' : 'medium'"
      @click.stop="changeMode"
    />
    <ion-progress-bar
      v-if="props.showProgressBar"
      :value="progressValue"
      :type="progressType"
      color="dark"
      class="progressBar"
    />
    <audio
      ref="audio"
      :src="audioUri"
      :loop="isLooped"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, defineProps, watch } from 'vue'
import { useMediaControls } from '@vueuse/core'
import { playCircle as playFilled, stopCircle as stopFilled, reloadCircle as repeatIcon } from 'ionicons/icons'
import { IonProgressBar , IonIcon } from '@ionic/vue'
import { MediaSession } from '@jofr/capacitor-media-session'
import { DownloadService } from '@/services/DownloadService'

const props = defineProps<{
  uri: string,
  title: string,
  artist: string,
  showProgressBar?: boolean,
  showRepeatButton?: boolean
}>()

watch(() => props.uri, async () => {
  stop()
  currentTime.value = 0
})


const service = new DownloadService()

const audio         = ref()
const audioUri      = ref('')
const isDownloading = ref(false)
const isLooped      = ref(false)
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

function changeMode() {
  isLooped.value = !isLooped.value
}
</script>


<style lang="scss" scoped>
.root {
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

.off {
  opacity: .5;
}
</style>