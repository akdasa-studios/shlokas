<template>
  <span
    class="timer"
    :class="{completed: timeLeft <= 0}"
  >
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
  (settingsStore.memorizationTime * 1000 * 60) - memorizationTimeSpend.value)

/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

watch([routeName, isActive], onStateChanged, { immediate: true })


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onStateChanged() {
  if (routeName.value === 'inboxDeck' && isActive.value) {
    // Timer should work only when user is on the inbox deck page
    /// and the app is active
    startTimer()
  } else {
    // Otherwise stop the timer
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
  const sign = (number >= 0) ? 1 : -1

  // Set positive value of number of sign negative
  number = number * sign

  // Separate the int from the decimal part
  const hour = Math.floor(number)
  let decpart = number - hour

  const min = 1 / 60
  // Round to nearest minute
  decpart = min * Math.round(decpart / min)

  let minute = Math.floor(decpart * 59).toString()

  // Add padding if need
  if (minute.length < 2) { minute = '0' + minute }

  return  hour + ':' + minute
}
</script>


<style scoped>
.timer {
  background-color: var(--ion-color-tertiary-tint);
  color: var(--ion-color-tertiary-contrast);
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 100px;
  margin-left: 5px;
  margin-right: 5px;
  font-variant-numeric: tabular-nums;
  font-size: small;
}

.completed {
  background-color: var(--ion-color-success-tint);
  color: var(--ion-color-success-contrast);
}
</style>