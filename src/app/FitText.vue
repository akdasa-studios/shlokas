<template>
  <span
    ref="component"
    class="fit"
  >
    <slot />
  </span>
</template>

<script lang="ts" setup>
import * as fitty from "fitty"
import { onMounted, onBeforeUnmount, ref, defineProps } from "vue"

const props = defineProps<{
  minSize: number,
  maxSize: number,
  multiLine: boolean
}>()

const component = ref()
let fittyInstance: fitty.FittyInstance

onBeforeUnmount(function() {
  fittyInstance?.unsubscribe()
})

onMounted(() => {
  fittyInstance = fitty.default(component.value, props)
})
</script>

<style scoped>
.fit {
  display: inline-block;
  white-space: nowrap;
}
</style>
