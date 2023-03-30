<template>
  <div id="root2">
    <TutorialCard
      v-if="activeCard"
      :visible="isActiveCardVisible"
      :buttons="activeCard.buttons"
      :progress="activeCardProgress"
      @click="onCardClicked"
      @button-clicked="onButtonClicked"
    >
      {{ activeCard.text }}
    </TutorialCard>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, toRefs, watch, defineEmits } from 'vue'
import TutorialCard from './TutorialCard.vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

export interface Button {
  id: string
  text: string
  color: string
}

interface TutorialCardData {
  text: string,
  position?: string
  duration?: number
  buttons? : Button[]
  onTimeout: () => void
  onButtonClicked?: (buttonId: string) => void
}

const props = defineProps<{
  cards: TutorialCardData[]
  step: number
}>()

const emit = defineEmits<{
  (event: 'card-clicked'): void
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { step } = toRefs(props)
const activeCardIdx = ref(0)
const activeCard = computed(() => props.cards[activeCardIdx.value])
const activeCardProgress = ref(0)
const isActiveCardVisible = ref(true)
const positionBottom = computed(() => {
  if (activeCard.value?.position === 'aboveGradeButtons') { return 120 }
  else return 50
})


/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

watch(step, (v) => next(v))


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

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function next(value: number) {
  isActiveCardVisible.value = false

  setTimeout(() => {
    activeCardIdx.value = value
    isActiveCardVisible.value = true
    activeCardProgress.value = 0

    if (activeCard.value && activeCard.value.duration) {
      setTimeout(() => {
        isActiveCardVisible.value = false
        if (activeCard.value.onTimeout) { activeCard.value.onTimeout() }
      }, activeCard.value.duration)
    }
  }, 250)

}


setInterval(() => {
  if (!activeCard.value.duration) { return }
  activeCardProgress.value += (100 * 100) / activeCard.value.duration
}, 100)
</script>

<style scoped>
#root2 {
  bottom: calc(v-bind(positionBottom) * 1px + var(--ion-safe-area-bottom));
  position: absolute;
  width: 100%;
  z-index: 1000;
}
</style>