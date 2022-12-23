<template>
  <div
    class="overlay"
    :class="{'invisible':!isVisible}"
  >
    <div v-if="props.grade">
      {{ t("cards.grade." + props.grade) }}
    </div>
    <div class="interval">
      {{ intervalHumanReadable }}
    </div>
  </div>
</template>


<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
const props = defineProps<{
  grade: string,
  interval: number,
}>()
const { t } = useI18n()
const isVisible = computed(() => props.grade)

const intervalHumanReadable = computed(() => {
  if (props.interval === 0) { return t('cards.schedule.inDays', { count: 0 }) }
  const days   = Math.floor(props.interval / 1440)
  const months = parseFloat((props.interval / 43200).toFixed(1))
  const years  = parseFloat((props.interval / 535600).toFixed(1))
  if      (days <= 31)  { return t('cards.schedule.inDays',{ count: days })}
  else if (days <= 365) { return t('cards.schedule.inMonths',{ count: months }) }
  else                  { return t('cards.schedule.inYears',{ count: years }) }
})
</script>


<style scoped>
.invisible {
  opacity: 0;
  background-color: white;
}
.overlay {
  position: absolute;
  display: flex;
  flex-direction: column;
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
}

.interval {
  margin: 20px;
  font-size: 15pt;
  text-transform: uppercase;
  color: gray;
}
</style>