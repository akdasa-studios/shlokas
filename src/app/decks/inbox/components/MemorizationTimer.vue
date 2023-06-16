<template>
  <span class="timer">
    {{ format(timeLeft / 60 / 1000) }}
  </span>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStateStore } from '@/app/shared'
import { useSettingsStore } from '@/app/settings'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const appStateStore = useAppStateStore()
const settingsStore = useSettingsStore()

let timerStartedAt = 0
let memorizationTimeSpendStart = 0
let timerInterval: any = undefined

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { memorizationTimeSpend, routeName, isActive } = storeToRefs(appStateStore)
const timeLeft = computed(() =>
  Math.max((settingsStore.memorizationTime * 1000 * 60) - memorizationTimeSpend.value, 0))

/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

watch([routeName, isActive], onStateChanged, { immediate: true })

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onStateChanged() {
  if (routeName.value === 'inboxDeck' && isActive.value) {
    startTimer()
  } else {
    stopTimer()
  }
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function startTimer() {
  timerStartedAt = new Date().getTime()
  memorizationTimeSpendStart = memorizationTimeSpend.value
  timerInterval = setInterval(tick, 1000)
}

function stopTimer() {
  if (timerInterval) { clearInterval(timerInterval) }
}

function tick() {
  const now = new Date().getTime()
  memorizationTimeSpend.value = memorizationTimeSpendStart + (now - timerStartedAt)
}

function format(number: number) {
  // Check sign of given number
  const sign = (number >= 0) ? 1 : -1

  // Set positive value of number of sign negative
  number = number * sign

  // Separate the int from the decimal part
  const hour = Math.floor(number)
  let decpart = number - hour

  const min = 1 / 60
  // Round to nearest minute
  decpart = min * Math.round(decpart / min)

  let minute = Math.floor(decpart * 60) + ''

  // Add padding if need
  if (minute.length < 2) {
    minute = '0' + minute
  }

  // // Add Sign in final result
  // sign = sign == 1 ? '' : '-'

  // // Concate hours and minutes
  // time = sign + hour + ':' + minute

  return  hour + ':' + minute
}
</script>


<style scoped>
.timer {
  background-color: var(--ion-color-dark-tint);
  color: var(--ion-color-dark-contrast);
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 100px;
  font-variant-numeric: tabular-nums;
}
</style>