<template>
  <div class="group">
    <div
      class="forgot"
      data-testid="forgot"
      @click.stop="emit('graded', ReviewGrade.Forgot)"
    >
      {{ $t('cards.grade.forgot') }}
      <div>{{ $t(...intervalToText.convert(props.intervals[0])) }}</div>
    </div>
    <div
      class="hard"
      data-testid="hard"
      @click.stop="emit('graded', ReviewGrade.Hard)"
    >
      {{ $t('cards.grade.hard') }}
      <div>{{ $t(...intervalToText.convert(props.intervals[1])) }}</div>
    </div>
    <div
      class="good"
      data-testid="good"
      @click.stop="emit('graded', ReviewGrade.Good)"
    >
      {{ $t('cards.grade.good') }}
      <div>{{ $t(...intervalToText.convert(props.intervals[2])) }}</div>
    </div>
    <div
      class="easy"
      data-testid="easy"
      @click.stop="emit('graded', ReviewGrade.Easy)"
    >
      {{ $t('cards.grade.easy') }}
      <div>{{ $t(...intervalToText.convert(props.intervals[3])) }}</div>
    </div>
  </div>
</template>


<script lang="ts" setup>

import { ReviewGrade } from '@akdasa-studios/shlokas-core'
import { useIntervalToText } from '@/app/decks/review'


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  intervals: number[]
}>()

const emit = defineEmits<{
  (event: 'graded', grade: ReviewGrade): void
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const intervalToText = useIntervalToText()

</script>

<style scoped>
.group {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 10px;
  gap: 10px;
  text-align: center;
}

.group div {
  padding: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 5px;
  text-transform: lowercase;
  flex-basis: 25%;
  font-weight: bold;
}

.group div.forgot {
  background-color: var(--ion-color-danger-tint);
}

.group div.hard {
  background-color: var(--ion-color-warning-shade);
}

.group div.good {
  background-color: var(--ion-color-success-shade);
}

.group div.easy {
  background-color: var(--ion-color-success-tint);
}

.group div div {
  padding: 2px;
  font-size: small;
  font-weight: normal;
}
</style>

