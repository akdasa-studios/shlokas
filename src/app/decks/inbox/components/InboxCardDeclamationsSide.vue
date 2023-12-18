<template>
  <div
    v-if="declamation"
    class="progress"
    :class="{
      'portrait': isPortrait,
      'landscape': !isPortrait
    }"
  >
    <CircleProgress
      data-testid="declamation-player"
      :progress="porgress"
      :current="repeatCurrent+1"
      :total="repeatsPerLine"
      @click.stop="onTogglePlaying"
    />
  </div>

  <div
    v-if="props.type === 'verse' || !declamation"
    :class="{
      putAtEnd: declamation && isPortrait,
      putAtRight: declamation && !isPortrait
    }"
  >
    <VerseSynonyms
      :synonyms="props.synonyms"
      :line-number="declamation ? currentLine : undefined"
    />
  </div>
</template>


<script lang="ts" setup>
import { Declamation, Synonym } from '@akdasa-studios/shlokas-core'
import { onMounted, ref, watch, shallowRef, computed, onBeforeUnmount } from 'vue'
import { CircleProgress, useAudio } from '@/app/decks/inbox'
import { VerseSynonyms } from '@/app/library'
import { useDownloader, useEnv, useScreenOrientation } from '@/app/shared'
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
const screenOrientation = useScreenOrientation()


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
const isPortrait = computed(() => screenOrientation.isPortrait.value)

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
  position: absolute;
}

.portrait {
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.landscape {
  left: 0%;
  top: 50%;
  transform: translateY(-50%);
}

.putAtEnd {
  margin-top: auto;
  margin-bottom: 2rem;
}

.putAtRight {
  width:50%;
  transform: translateX(33%);
}
</style>