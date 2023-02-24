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
      :value="playProgress"
      color="light"
      class="progressBar"
    />
    <audio
      ref="audio"
      :src="path"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, defineProps } from 'vue'
import { useMediaControls } from '@vueuse/core'
import { play as playFilled, stop as stopFilled } from 'ionicons/icons'
import { IonProgressBar , IonIcon } from '@ionic/vue'
import { DownloadService } from '@/services/DownloadService'

const props = defineProps<{ src: string }>()
const path = ref('')
const audio = ref()
const playProgress = computed(() => {
  return currentTime.value / duration.value || 0
})

const { playing, currentTime, duration } = useMediaControls(audio, { src: path })

async function play() {
  const service = new DownloadService()
  path.value = await service.download(props.src)
  nextTick(() => playing.value = true)
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