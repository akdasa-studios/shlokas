<template>
  <div class="tutorial-cards">
    <TutorialCard
      v-if="activeCard"
      :visible="activeCardVisible"
      :buttons="activeCard.buttons"
      :progress="activeCardProgress"
      @click="onCardClicked"
      @button-clicked="onButtonClicked"
    >
      {{ $t(activeCard.text) }}
    </TutorialCard>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, toRefs, watch, defineEmits, onMounted } from 'vue'
import { TutorialStep } from '../models/TutorialStep'
import TutorialCard from './TutorialCard.vue'


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  cards: TutorialStep[]
  step: number
}>()

const emit = defineEmits<{
  (event: 'card-clicked'): void
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { step } = toRefs(props)
const activeCardIdx = ref(step.value)
const activeCard = computed(() => props.cards[activeCardIdx.value])
const activeCardProgress = ref(0)
const activeCardVisible = ref(true)
const positionBottom = computed(() => {
  if (activeCard.value?.position === 'aboveGradeButtons') { return 120 }
  else return 50
})


/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

watch(step, (v) => next(v))
onMounted(() => onSetupCard())


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onCardClicked() {
  emit('card-clicked')
}

function onButtonClicked(buttonId: string) {
  if (!activeCard.value.onButtonClicked) { return }
  activeCard.value.onButtonClicked(buttonId)
}

function onSetupCard() {
  if (activeCard.value && activeCard.value.duration) {
    setTimeout(() => {
      activeCardVisible.value = false
      if (activeCard.value.onTimeout) { activeCard.value.onTimeout() }
    }, activeCard.value.duration)
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function next(value: number) {
  activeCardVisible.value = false

  setTimeout(() => {
    activeCardIdx.value = value
    activeCardProgress.value = 0
    activeCardVisible.value = true
    onSetupCard()
  }, 250)

}


setInterval(() => {
  if (!activeCard.value.duration) { return }
  activeCardProgress.value += (100 * 100) / activeCard.value.duration
}, 100)
</script>


<style scoped>
.tutorial-cards {
  bottom: calc(v-bind(positionBottom) * 1px + var(--ion-safe-area-bottom));
  position: absolute;
  width: 100%;
  z-index: 1000;
}
</style>