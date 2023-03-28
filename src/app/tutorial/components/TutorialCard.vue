<template>
  <div
    id="root"
    :class="{ 'visible': props.visible, 'hidden': !props.visible }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  visible: boolean,
}>()
</script>

<style scoped>
#root {
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
  gap: 10px;
  opacity: .8;
}

#root.hidden {
  opacity: 0;
  bottom: -50px;
}

#root.visible {
  opacity: .8;
  bottom: 0px;
}
</style>