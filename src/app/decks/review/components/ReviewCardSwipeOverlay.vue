<template>
  <div
    id="root"
    :class="{ 'visible': visible, 'hidden': !visible }"
  >
    <div
      class="option forgot"
      :class="getStatusFor('forgot')"
    >
      <IonIcon
        :icon="arrowUpCircle"
        size="large"
      />
      {{ $t('cards.grade.forgot') }}
    </div>

    <div
      class="option hard"
      :class="getStatusFor('hard')"
    >
      <IonIcon
        :icon="arrowDownCircle"
        size="large"
      />
      {{ $t('cards.grade.hard') }}
    </div>

    <div
      class="option good"
      :class="getStatusFor('good')"
    >
      <IonIcon
        :icon="arrowBackCircle"
        size="large"
      />
      {{ $t('cards.grade.good') }}
    </div>

    <div
      class="option easy"
      :class="getStatusFor('easy')"
    >
      <IonIcon
        :icon="arrowForwardCircle"
        size="large"
      />
      {{ $t('cards.grade.easy') }}
    </div>
  </div>
</template>


<script lang="ts" setup>
import { defineProps } from 'vue'
import { arrowBackCircle, arrowUpCircle, arrowForwardCircle, arrowDownCircle } from 'ionicons/icons'
import { IonIcon } from '@ionic/vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  visible: boolean,
  status: 'forgot' | 'hard' | 'good' | 'easy' | 'none',
}>()


/* -------------------------------------------------------------------------- */
/*                                   Status                                   */
/* -------------------------------------------------------------------------- */

function getStatusFor(status: string) {
  if (props.status == 'none') { return undefined }
  if (props.status != status) { return 'hidden' }
  return 'selected'
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