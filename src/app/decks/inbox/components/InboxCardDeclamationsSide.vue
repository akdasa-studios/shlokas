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
      :synonyms="props.synonyms"
      :line-number="currentLine"
    />
  </div>
</template>


<script lang="ts" setup>
import { Declamation, Synonym } from '@akdasa-studios/shlokas-core'
import { storeToRefs } from 'pinia'
import { defineProps, onMounted, ref, watch, shallowRef, computed } from 'vue'
import { CircleProgress } from '@/app/decks/inbox'
import { VerseSynonyms } from '@/app/library'
import { useAudioPlayerStore } from '@/app/shared'

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

const audioPlayer = useAudioPlayerStore()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const declamation = shallowRef<Declamation>()
const repeatCurrent = ref(0)
const repeatsPerLine = ref(5)
const currentLine = ref(0)
const skipedLines = ref(0)
const { duration, time, playing } = storeToRefs(audioPlayer)

const porgress = computed(function() {
  const lines = (declamation.value?.markers.length ?? 0) + 1
  const totalRepeats = (lines * repeatsPerLine.value)
  const repeatsDone  = currentLine.value * repeatsPerLine.value + repeatCurrent.value
  return repeatsDone / totalRepeats
})


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

watch(time, (value) => onAudioProgressChanged(value, duration.value))
onMounted(onOpened)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onOpened() {
  declamation.value = getDefautltDeclamation()
  if (declamation.value) { audioPlayer.open(declamation.value.url) }
}


function onTogglePlaying() {
  playing.value = !playing.value
}

function onAudioProgressChanged(value: number, duration: number) {
  const d = getDefautltDeclamation() as Declamation


  if (value >= (d.markers[currentLine.value - skipedLines.value] || (duration-.5))) {
    repeatCurrent.value += 1
    if (repeatCurrent.value >= repeatsPerLine.value) {
      repeatCurrent.value = 0
      currentLine.value += 1
    }
    time.value = currentLine.value > 0 ?  d.markers[currentLine.value - skipedLines.value - 1] : 0
    playing.value = true
  }

  if (currentLine.value > d.markers.length + skipedLines.value) {
    playing.value = false
    currentLine.value = 0
    repeatCurrent.value = 0
    time.value = 0
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
.progress {
  display: flex;
  height: 85%;
  align-items: center;
}

.synonyms {
  height: 15%;
}
</style>