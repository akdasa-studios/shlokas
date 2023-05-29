<template>
  <div>
    <div
      v-for="declamation, idx in props.declamations"
      :key="declamation.id.value"
      class="list-item"
      :class="{'active': idx === active}"
      @click="onTrackSelected(idx)"
    >
      <span v-if="!isDefaultTheme(declamation.theme)">
        {{ $t(themeDeclamationKey(declamation.theme)) }}
      </span>
      <span
        v-else
        class="type"
      >
        {{ $t(typeDeclamationKey(declamation.type)) }}
      </span>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { Declamation } from '@akdasa-studios/shlokas-core'


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  declamations: Declamation[],
  active: number
}>()

const emit = defineEmits<{
  (event: 'select', index: number): void
}>()

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onTrackSelected(idx: number) {
  emit('select', idx)
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function isDefaultTheme(theme: string) {
  return theme === 'default'
}

function themeDeclamationKey(theme: string) {
  return `themes.${theme}`
}

function typeDeclamationKey(theme: string) {
  return `types.${theme}`
}
</script>


<style scoped>
.list-item {
  padding: .3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.type {
  text-transform: capitalize;
}

.list-item.active {
  font-weight: bold;
}
</style>