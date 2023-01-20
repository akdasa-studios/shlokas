<template>
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
</template>


<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { MemorizingStatus } from '@/app/decks/inbox'
const props = defineProps<{
  memorizingStatus: MemorizingStatus,
}>()
const isFinished = computed(() => props.memorizingStatus === MemorizingStatus.Memorized)
</script>


<style scoped>
.invisible { opacity: 0; }
.transition { transition: .25s; }
</style>


<style src="@/app/decks/Card.scss" lang="scss" scoped />