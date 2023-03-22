<template>
  <div
    class="section gauge"
  >
    <CircleProgress
      :progress="circleProgress"
      :current="lineRepeatCount"
      :total="totalRepeatCount"
      @click.stop="onTogglePlaying"
    />

    <audio
      ref="audioRef"
      :src="uri"
    />
  </div>

  <div class="section synonyms">
    <VerseSynonyms
      :synonyms="props.synonyms"
      :line-number="currentVerseLine"
    />
  </div>
</template>


<script lang="ts" setup>
import { Declamation, Synonym } from '@akdasa-studios/shlokas-core'
import { defineProps, onMounted, ref, watch } from 'vue'
import { useMediaControls } from '@vueuse/core'
import { useEnv, useAudioPlayerStore, useDownloadService } from '@/app/shared'
import { VerseSynonyms } from '@/app/library'
import { CircleProgress } from '@/app/decks/inbox'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  declamations: Declamation[]
  synonyms: Synonym[]
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const env = useEnv()
const downloadService = useDownloadService()
const audioPlayer = useAudioPlayerStore()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const audioRef = ref()
const uri = ref('')
const player = useMediaControls(audioRef, { src: uri })

const circleProgress = ref(0)
const lineRepeatCount = ref(1)
const totalRepeatCount = ref(3)
const currentVerseLine = ref(0)


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

watch(uri, async (value) => onUrlChanged(value), { immediate: true })
watch(player.currentTime, (value) => onAudioProgressChanged(value, player.duration.value))

onMounted(onOpened)

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onOpened() {
  const declamation = getDefautltDeclamation()
  if (declamation) {
    uri.value = env.getContentUrl(declamation.url)
  }
}

async function onUrlChanged(url: string|undefined) {
  if (!url) { return }
  const localUri = await downloadService.download(url)
  audioPlayer.open(localUri, 'title', 'artist')
}

function onTogglePlaying() {
  player.playing.value = !player.playing.value
}

function onAudioProgressChanged(value: number, duration: number) {
  console.log(value, duration)
  const d = getDefautltDeclamation() as Declamation
  const porgress = (currentVerseLine.value * totalRepeatCount.value + lineRepeatCount.value) / (5 * totalRepeatCount.value)  //value/duration
  circleProgress.value = porgress

  if (value >= d.markers[currentVerseLine.value] || value === duration) {
    lineRepeatCount.value += 1
    if (lineRepeatCount.value > totalRepeatCount.value) {
      lineRepeatCount.value = 1
      currentVerseLine.value += 1
    }
    player.currentTime.value = currentVerseLine.value > 0 ?  d.markers[currentVerseLine.value - 1] : 0
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function getDefautltDeclamation(): Declamation|undefined {
  return props.declamations.find(x => x.theme === 'default' && x.type === 'verse')
}
</script>



<style scoped lang="scss">
.root {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}

.gauge {
  display: flex;
  height: 85%;
  justify-content: center;
  align-items: center;
}

.synonyms {
  height: 15%;
}
</style>