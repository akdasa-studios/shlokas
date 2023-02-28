<template>
  <ion-img
    :src="props.src"
    :class="darkMode"
  />
</template>

<script lang="ts" setup>
import { IonImg } from '@ionic/vue'
import { usePreferredDark } from '@vueuse/core'
import { computed, defineProps, withDefaults } from 'vue'

export interface Props {
  src: string
  mode?: 'invert'|'grayscale'|undefined
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'grayscale'
})

const isDark = usePreferredDark()
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
