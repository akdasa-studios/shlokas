<template>
  <div
    class="overlay"
    :class="{'invisible':!isVisible}"
  >
    <div>
      {{ grade }}
    </div>
  </div>
</template>


<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
const props = defineProps<{
  state: number,
}>()
const { t } = useI18n()
const isVisible = computed(() => Math.abs(props.state) > 0)

const grades = [
  "Do Not Remember",
  "Very Hard",
  "Hard",
  "Easy",
  "Very Easy",
  "Perfect",
]
const colorGrades = [
  "#FF0000",
  "#BF3F00",
  "#996600",
  "#669900",
  "#33CC00",
  "#00FF00"
]
const idx = computed(() => {
  const maxValue = 2
  const result = Math.ceil(props.state / 40) + maxValue
  if (result < 0) { return 0 }
  if (result > 5) { return 5 }
  return result;
})
const grade = computed(() => grades[idx.value])
const color = computed(() => colorGrades[idx.value])
</script>


<style scoped>
.invisible {
  opacity: 0;
  background-color: white;
}
.overlay {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 9vw;
  background-color: white;
  transition: .25s;
  text-align: center;
  border-radius: 8px;
  border: 1px solid #ddd;
  border-bottom: 10px solid #ddd;
  border-bottom-color: v-bind(color);
}
</style>


<i18n locale="en" lang="yaml">
in-progress: In progress
finished: Add
</i18n>

<i18n locale="ru" lang="yaml">
in-progress: Ещё учу
finished: Выучил
</i18n>
