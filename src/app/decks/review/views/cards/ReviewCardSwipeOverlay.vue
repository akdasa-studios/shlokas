<template>
  <div
    class="side borders big-text transition"
    :class="{'invisible':!isVisible}"
  >
    <div
      v-if="props.grade"
      class="grade"
    >
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
.invisible { opacity: 0; }
.grade { text-transform: uppercase; }

.interval {
  margin: 20px;
  font-size: 15pt;
  text-transform: uppercase;
  color: var(--ion-color-medium-shade);
}
</style>

<style src="@/app/decks/Card.css" />