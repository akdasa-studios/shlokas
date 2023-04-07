<template>
  <img
    :src="props.src"
    :class="darkMode"
  >
</template>

<script lang="ts" setup>
import { computed, toRefs, withDefaults } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Inetrface                                 */
/* -------------------------------------------------------------------------- */

export interface Props {
  src: string
  mode?: 'invert' | 'grayscale' | undefined
  isDark?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'grayscale',
  isDark: false
})

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { isDark } = toRefs(props)
const darkMode = computed(() => isDark.value ? props.mode : undefined)
</script>

<style scoped>
.grayscale {
  filter: grayscale(1) brightness(.85) contrast(1.2);
}

.invert {
  filter: invert();
}
</style>
