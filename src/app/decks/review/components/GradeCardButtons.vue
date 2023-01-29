<template>
  <div class="group">
    <div
      class="forgot"
      @click.stop="emit('graded', ReviewGrade.Forgot)"
    >
      Forgot
      <div>{{ intervalToText(props.intervals[0]) }}</div>
    </div>
    <div
      class="hard"
      @click.stop="emit('graded', ReviewGrade.Hard)"
    >
      Hard
      <div>{{ intervalToText(props.intervals[1]) }}</div>
    </div>
    <div
      class="good"
      @click.stop="emit('graded', ReviewGrade.Good)"
    >
      Good
      <div>{{ intervalToText(props.intervals[2]) }}</div>
    </div>
    <div
      class="easy"
      @click.stop="emit('graded', ReviewGrade.Easy)"
    >
      Easy
      <div>{{ intervalToText(props.intervals[3]) }}</div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import { ReviewGrade } from '@akdasa-studios/shlokas-core'
import intervalToText from './cards/IntervalToText'

const props = defineProps<{
  intervals: number[]
}>()

const emit = defineEmits<{
  (event: 'graded', grade: ReviewGrade): void
}>()
</script>

<style scoped lang="scss">
.group {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 10px;
  gap: 10px;
  text-align: center;

  div {
    padding: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 5px;
    text-transform: lowercase;
    flex-basis: 25%;
    font-weight: bold;

    &.forgot {
      background-color: var(--ion-color-danger-tint);
    }
    &.hard {
      background-color: var(--ion-color-warning-tint);
    }
    &.good {
      background-color: var(--ion-color-success-shade);
    }
    &.easy {
      background-color: var(--ion-color-success-tint);
    }

    div {
      padding: 2px;
      font-size: small;
      font-weight: normal;
    }
  }
}

</style>

