<template>
  <div
    class="big-text transition"
    :class="{'invisible':!isVisible}"
  >
    <div v-if="isFinished">
      <span>😎</span>
      <div>
        {{ $t('cards.inbox.finished') }}
      </div>
    </div>

    <div v-else>
      <span>⏱</span>
      <div>
        {{ $t('cards.inbox.inProgress') }}
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { defineProps, computed } from 'vue'
const props = defineProps<{
  grade: string,
}>()
const isVisible = computed(() => !!props.grade)
const isFinished = computed(() => props.grade === 'finished')
</script>


<style scoped>
.invisible { opacity: 0; }
.transition { transition: .25s; }
</style>

<style src="@/app/decks/Card.scss" lang="scss" scoped />