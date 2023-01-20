<template>
  <ion-img
    :src="props.src"
    :class="{'dark':isDark}"
  />
</template>

<script lang="ts" setup>
import { IonImg } from '@ionic/vue'
import { usePreferredDark } from '@vueuse/core'
import { defineProps } from 'vue'

const props = defineProps<{
  src: string
}>()

const isDark = usePreferredDark()
</script>

<style scoped>
.dark {
  filter: grayscale(1) brightness(.85) contrast(1.2);
}
</style>
