<template>
  <div class="root">
    <ion-icon
      v-if="!audioPlayer.playing.value"
      :icon="playCircle"
      size="large"
      color="dark"
      @click.stop="audioPlayer.play()"
    />
    <ion-icon
      v-else
      :icon="stopCircle"
      color="dark"
      size="large"
      @click.stop="audioPlayer.stop()"
    />
    <ion-progress-bar
      v-if="props.showProgressBar"
      :value="audioPlayer.progress.value"
      :type="progressType"
      color="dark"
      class="progressBar"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, toRefs, withDefaults, onBeforeUnmount } from 'vue'
import { playCircle, stopCircle } from 'ionicons/icons'
import { IonProgressBar , IonIcon } from '@ionic/vue'
import { useDownloader, useEnv } from '@/app/shared'
import { useAudio } from '@/app/decks/inbox'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = withDefaults(defineProps<{
  url?: string,
  title?: string,
  artist?: string,
  showProgressBar?: boolean,
  showRepeatButton?: boolean
}>(), {
  url: '', title: '', artist: ''
})

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const env = useEnv()
const downloadService = useDownloader()
const audioPlayer = useAudio()


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onBeforeUnmount(() => audioPlayer.stop())


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { url } = toRefs(props)
const progressType  = computed(() => downloadService.isDownloading.value ? 'indeterminate' : 'determinate')


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

watch(url, async (value) => onUrlChanged(value), { immediate: true })

async function onUrlChanged(url: string) {
  if (!url) { return }
  const localUrl = await downloadService.download(env.getContentUrl(url))
  audioPlayer.open(localUrl)
}
</script>


<style scoped>
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