<template>
  <AudioPlayer
    :uri="localUrl"
    :title="title"
    :artist="$t('app.name')"
    :playing="playing"
    :loop="loop"
    :time="time"
    @status="onStatusChanged"
  />
</template>


<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useAudioPlayerStore, useDownloadService, useEnv } from '@/app/shared'
import AudioPlayer from './AudioPlayer.vue'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const downloadService = useDownloadService()
const audioPlayerStore = useAudioPlayerStore()
const env = useEnv()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const localUrl = ref('')
const {
  playing, time, duration, uri, title, loop
} = storeToRefs(audioPlayerStore)


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

watch(uri, (value) => onUrlChanged(value))


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onStatusChanged(status: any) {
  playing.value = status.playing
  time.value = status.time
  duration.value = status.duration
}

async function onUrlChanged(url: string) {
  if (!url) { return }
  localUrl.value = await downloadService.download(env.getContentUrl(url))
}
</script>


