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

