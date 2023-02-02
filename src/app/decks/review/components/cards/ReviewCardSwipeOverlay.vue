<template>
  <div
    class="big-text transition"
    :class="{'invisible':!isVisible}"
  >
    <div
      v-if="props.grade !== undefined"
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
const isVisible = computed(() => props.grade !== undefined)
const reviewGradeToName = computed(() =>
  props.grade !== undefined ? ReviewGrade[props.grade].toLowerCase() : ""
)
</script>


<style scoped>
.invisible { opacity: 0; }
.grade { text-transform: uppercase; }

.interval {
  margin: 20px;
  font-size: 15pt;
  text-transform: uppercase;
  color: var(--ion-color-medium-shade);
}
</style>

<style src="@/app/decks/Card.scss" lang="scss" scoped />