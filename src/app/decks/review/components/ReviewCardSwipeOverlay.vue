<template>
  <div
    id="root"
    :class="{ 'visible': visible, 'hidden': !visible }"
  >
    <div
      class="option"
      :class="getClassForGrade()"
    >
      <IonIcon
        :icon="arrowUpCircle"
        size="large"
      />
      {{ $t(getGradeName()) }}
    </div>

    <div
      class="option forgot"
      :class="getClassForForgot()"
    >
      <IonIcon
        :icon="arrowBackCircle"
        size="large"
      />
      {{ $t('cards.grade.forgot') }}
    </div>

    <div
      class="option"
      :class="getClassForSchedule()"
    >
      {{ $t(...intervalToText.convert(props.interval)) }}
    </div>
  </div>
</template>


<script lang="ts" setup>
import { defineProps } from 'vue'
import { arrowBackCircle, arrowUpCircle } from 'ionicons/icons'
import { IonIcon } from '@ionic/vue'
import { useIntervalToText } from '@/app/decks/review'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  visible: boolean,
  status: 'forgot' | 'hard' | 'good' | 'easy' | 'none',
  interval: number,
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const intervalToText = useIntervalToText()

/* -------------------------------------------------------------------------- */
/*                                   State                                    */
/* -------------------------------------------------------------------------- */

function getClassForSchedule() {
  if (['none', 'forgot'].includes(props.status)) { return 'hidden' }
  return props.status
}

function getClassForForgot() {
  if (props.status === 'none') { return undefined }
  if (props.status === 'forgot') { return 'selected' }
  return 'hidden'
}

function getClassForGrade() {
  if (props.status === 'none') { return 'hard' }
  if (props.status !== 'forgot') { return ['selected', props.status] }
  return 'hidden'
}

function getGradeName() {
  if (['none', 'forgot'].includes(props.status)) { return 'cards.grade.remember' }
  return 'cards.grade.' + props.status
}
</script>


<style scoped>
#root {
  position: absolute;
  width: calc(100% - 20px);
  background-color: var(--ion-color-dark);
  color: var(--ion-color-dark-contrast);
  z-index: 1000;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  transition: ease-in-out .25s;
  display: flex;
}

#root.hidden {
  opacity: 0;
  top: -50px;
}

#root.visible {
  opacity: .8;
  top: 0px;
}

.option {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  flex-basis: 0;
  flex-grow: 1;
  transition: ease-in-out .25s;

  overflow: hidden;
  white-space: nowrap;
}

.option.hidden {
  opacity: 0;
  flex-grow: 0;
  flex-basis: 0px;
}

.option.selected {
  opacity: 1;
}

.forgot {
  color: var(--ion-color-danger-tint);
}
.hard {
  color: var(--ion-color-warning-shade);
}
.good {
  color: var(--ion-color-success-shade);
}
.easy {
  color: var(--ion-color-success-tint);
}
</style>