<template>
  <div class="progress">
    <CircleProgress
      :progress="porgress"
      :current="repeatCurrent+1"
      :total="repeatsPerLine"
      @click.stop="onTogglePlaying"
    />
  </div>

  <div class="synonyms">
    <VerseSynonyms
      v-if="props.type === 'verse'"
      :synonyms="props.synonyms"
      :line-number="currentLine"
    />
  </div>
</template>


<script lang="ts" setup>
import { Declamation, Synonym } from '@akdasa-studios/shlokas-core'
import { onMounted, ref, watch, shallowRef, computed, onBeforeUnmount } from 'vue'
import { CircleProgress, useAudio } from '@/app/decks/inbox'
import { VerseSynonyms } from '@/app/library'
import { useDownloader, useEnv } from '@/app/shared'
import { TutorialSteps, useTutorialStore } from '@/app/tutorial'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  declamations: Declamation[]
  synonyms: Synonym[]
  type: string
}>()

defineExpose({
  stopAudio: stop
})


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const audio = useAudio()
const env = useEnv()
const downloader = useDownloader()
const tutorial = useTutorialStore()


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onMounted(onOpened)
onBeforeUnmount(stop)


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const declamation = shallowRef<Declamation>()
const repeatCurrent = ref(0)
const repeatsPerLine = ref(5)
const currentLine = ref(0)
const playing = ref(false)

const porgress = computed(function() {
  const lines = (declamation.value?.markers.length ?? 0) + 1
  const totalRepeats = (lines * repeatsPerLine.value)
  const repeatsDone  = currentLine.value * repeatsPerLine.value + repeatCurrent.value
  return repeatsDone / totalRepeats
})


/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

watch(audio.playing, onAudioProgressChanged)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onOpened() {
  declamation.value = getDefautltDeclamation()
  if (declamation.value) {
    const localUrl = await downloader.download(env.getContentUrl(declamation.value.url))
    audio.open(localUrl)
  }
}

function onTogglePlaying() {
  playing.value = !playing.value
  if (playing.value) { play() } else { audio.stop() }
  tutorial.completeStep(TutorialSteps.InboxDeckPlayDeclamation)
}

function onAudioProgressChanged(value: boolean) {
  if (!playing.value) { return }
  if (!declamation.value) { return }
  if (value === true) { return }

  repeatCurrent.value += 1

  // Last repeat of a current line, go to the next line
  if (repeatCurrent.value >= repeatsPerLine.value) {
    currentLine.value += 1
    repeatCurrent.value = 0
  }

  // Last line repeated, stop playing
  if (currentLine.value > declamation.value.markers.length) {
    currentLine.value = 0
    repeatCurrent.value = 0
    playing.value = false
    return
  }

  play()
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function getDefautltDeclamation(): Declamation|undefined {
  return props.declamations.find(x => x.theme === 'default' && x.type === props.type)
}

function play() {
  if (!declamation.value) { return }
  audio.play(
    declamation.value.markers[currentLine.value - 1] || 0,
    declamation.value.markers[currentLine.value] || audio.duration.value
  )
}

function stop() { audio.stop() }
</script>



<style scoped>
.progress {
  display: flex;
  height: 85%;
  align-items: center;
}

.synonyms {
  height: 15%;
}
</style>