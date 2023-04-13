<template>
  <div
    class="tutorial-card"
    :class="{ 'visible': props.visible, 'hidden': !props.visible }"
  >
    <slot />
    <div class="progress" />

    <div
      v-if="buttons"
      class="buttons"
    >
      <ion-button
        v-for="button in props.buttons"
        :key="button.id"
        :color="button.color"
        class="button"
        @click.stop="onClicked(button.id)"
      >
        {{ $t(button.text) }}
      </ion-button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { toRefs } from 'vue'
import { IonButton } from '@ionic/vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

export interface Button {
  id: string
  text: string
  color: string
}

const props = defineProps<{
  visible: boolean,
  buttons?: Button[]
  progress?: number
}>()

const emit = defineEmits<{
  (event: 'button-clicked', buttonId: string): void
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { progress } = toRefs(props)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onClicked(buttonId: string) {
  emit('button-clicked', buttonId)
}
</script>


<style scoped>
.tutorial-card {
  bottom: -50px;
  position: absolute;
  width: calc(100% - 20px);
  background-color: var(--ion-color-always-dark);
  color: var(--ion-color-always-dark-contrast);
  z-index: 1000;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  transition: ease-in-out .25s;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow: hidden;
  pointer-events: visible;
}

.tutorial-card.hidden {
  opacity: 0;
  bottom: -50px;
  visibility: hidden;
}

.tutorial-card.visible {
  opacity: .9;
  bottom: 0px;
}

.buttons {
  display: flex;
  flex-direction: row;
  gap: 5px;
}
.button {
  flex-grow: 1;
  flex-basis: 0;
}
.progress {
  background-color: var(--ion-color-success);
  position: absolute;
  left: 0px;
  bottom: 0px;
  height: 5px;
  width: calc(v-bind(progress) * 1%);
  transition: .1s ease-out;
}
</style>