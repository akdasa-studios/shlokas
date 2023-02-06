<template>
  <div class="root">
    <DarkImage
      src="brahma.svg"
      class="img"
    />
    <div class="text">
      <div>{{ $t('decks.review.empty') }}</div>
      <div
        data-testid="cardsCountDueToTomorrow"
      >
        {{ $t('decks.review.dueToTomorrow', { count: cardsCountDueToTomorrow }) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { inject } from 'vue'
import { Application } from '@akdasa-studios/shlokas-core'
import { DarkImage } from '@/app/shared'
import { useStatisticsStore } from '@/app/statistics'

const statisticsStore = useStatisticsStore(inject('app') as Application)
const { cardsCountDueToTomorrow } = storeToRefs(statisticsStore)
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.text {
  margin: 20px;
  text-align: center;
}

.img {
  max-width: 50%;
}
</style>
