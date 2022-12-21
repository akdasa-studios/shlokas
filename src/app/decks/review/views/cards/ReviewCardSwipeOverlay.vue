<template>
  <div
    class="overlay"
    :class="{'invisible':!isVisible}"
  >
    <div v-if="props.grade">
      {{ t("cards.grade." + props.grade) }}
    </div>
  </div>
</template>


<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
const props = defineProps<{
  grade: string,
}>()
const { t } = useI18n()
const isVisible = computed(() => props.grade)
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
  background-color: #eee;
  transition: .25s;
  text-align: center;
  border-radius: 8px;
  border: 1px solid #ddd;
  border-bottom: 10px solid #ddd;
}
</style>