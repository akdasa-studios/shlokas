<template>
  <div id="root2">
    <TutorialCard
      :visible="isActiveCardVisible"
      @click="onCardClicked"
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

interface TutorialCardData {
  text: string,
  position?: string
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
const isActiveCardVisible = ref(true)
const positionBottom = computed(() => {
  if (activeCard.value.position === 'aboveGradeButtons') { return 120 }
  else return 50
})


/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

watch(step, () => next())


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onCardClicked() {
  emit('card-clicked')
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function next() {
  isActiveCardVisible.value = false
  setTimeout(() => {
    activeCardIdx.value += 1
    isActiveCardVisible.value = true
  }, 250)
}
</script>

<style scoped>
#root2 {
  bottom: calc(v-bind(positionBottom) * 1px);
  position: absolute;
  width: 100%;
  z-index: 1000;
}
</style>