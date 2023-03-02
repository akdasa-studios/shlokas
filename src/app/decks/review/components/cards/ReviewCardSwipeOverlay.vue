<template>
  <div
    class="big-text transition"
  >
    <div
      class="grade"
    >
      {{ t("cards.grade." + reviewGradeToName) }}
    </div>
    <div class="interval">
      {{ intervalToText($t, props.interval) }}
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ReviewGrade } from '@akdasa-studios/shlokas-core'
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import intervalToText from './IntervalToText'
const props = defineProps<{
  grade: ReviewGrade|undefined,
  interval: number
}>()
const { t } = useI18n()
const reviewGradeToName = computed(() =>
  props.grade !== undefined ? ReviewGrade[props.grade].toLowerCase() : ''
)
</script>


<style scoped>
.grade { text-transform: uppercase; }

.interval {
  margin: 20px;
  font-size: 15pt;
  text-transform: uppercase;
  color: var(--ion-color-medium-shade);
}
</style>
