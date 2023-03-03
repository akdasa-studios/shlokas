<template>
  <div class="root">
    <ion-icon
      v-if="!playing"
      :icon="playCircle"
      size="large"
      color="dark"
      @click.stop="audioPlayer.play"
    />
    <ion-icon
      v-else
      :icon="stopCircle"
      color="dark"
      size="large"
      @click.stop="audioPlayer.stop"
    />
    <ion-icon
      v-if="props.showRepeatButton"
      :icon="reloadCircle"
      size="large"
      :color="loop ? 'primary' : 'medium'"
      @click.stop="audioPlayer.toggleLoop"
    />
    <ion-progress-bar
      v-if="props.showProgressBar"
      :value="progress"
      :type="progressType"
      color="dark"
      class="progressBar"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, watch, toRefs } from 'vue'
import { playCircle, stopCircle, reloadCircle } from 'ionicons/icons'
import { IonProgressBar , IonIcon } from '@ionic/vue'
import { storeToRefs } from 'pinia'
import { useAudioPlayerStore, useDownloadService } from '@/app/shared'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  uri?: string,
  title?: string,
  artist?: string,
  showProgressBar?: boolean,
  showRepeatButton?: boolean
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const downloadService = useDownloadService()
const audioPlayer = useAudioPlayerStore()
const { uri } = toRefs(props)
const { playing, loop, progress } = storeToRefs(audioPlayer)
const progressType  = computed(() => downloadService.isDownloading.value ? 'indeterminate' : 'determinate')

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

watch(uri, async (value) => onUriChanged(value), { immediate: true })

async function onUriChanged(uri: string|undefined) {
  if (!uri) { return }
  const localUri = await downloadService.download(uri)
  audioPlayer.open(localUri, props.title, props.artist)
}
</script>


<style lang="scss" scoped>
.root {
  padding: .5rem;
  display: flex;
  align-items: center;
  justify-items: baseline;
}

.progressBar {
  margin-left: .5rem;
  margin-right: .5rem;
}
</style>