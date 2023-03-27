<template>
  <div
    id="root"
    :class="{ 'visible': visible, 'hidden': !visible }"
  >
    <div
      class="option success"
      :class="getStatusFor('memorized')"
    >
      <IonIcon
        :icon="arrowUpCircle"
        size="large"
      />
      {{ $t('cards.inbox.memorized') }}
    </div>
    <div
      class="option warning"
      :class="getStatusFor('memorizing')"
    >
      <IonIcon
        :icon="arrowBackCircle"
        size="large"
      />
      {{ $t('cards.inbox.memorizing') }}
    </div>
  </div>
</template>


<script lang="ts" setup>
import { defineProps } from 'vue'
import { arrowBackCircle, arrowUpCircle } from 'ionicons/icons'
import { IonIcon } from '@ionic/vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  visible: boolean,
  status: 'memorized' | 'memorizing' | 'none',
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
  background-color: var(--ion-color-always-dark);
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

.success {
  color: var(--ion-color-success);
}
.warning {
  color: var(--ion-color-warning);
}
</style>