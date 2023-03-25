<template>
  <div v-if="declamationsCount > 0">
    <VerseAudioPlayer
      :url="activeDeclamation.url"
      :title="props.title"
      :artist="$t('app.name')"
      :show-progress-bar="true"
    />

    <DeclamationsList
      v-if="declamationsCount > 1"
      :declamations="declamations"
      :active="activeDeclamationIdx"
      class="list"
      @select="onActiveDeclamationChanged"
    />
  </div>
</template>


<script lang="ts" setup>
import { Declamation } from '@akdasa-studios/shlokas-core'
import { computed, defineProps, ref } from 'vue'
import { useSorted } from '@vueuse/core'
import { VerseAudioPlayer } from '@/app/shared'
import { DeclamationsList } from '@/app/library'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  title: string,
  declamations: Declamation[],
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const declamations = useSorted<Declamation>(props.declamations, (a,b) => getSortScore(a) - getSortScore(b))
const declamationsCount = computed(() => declamations.value.length)
const activeDeclamationIdx = ref<number>(0)
const activeDeclamation = computed(() => declamations.value[activeDeclamationIdx.value])


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onActiveDeclamationChanged(idx: number) {
  activeDeclamationIdx.value = idx
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function getSortScore(declamation: Declamation): number {
  let score = 0
  if (declamation.type === 'translation') { score += 10 }
  if (declamation.theme !== 'default') { score += 10 }
  return score
}
</script>


<style scoped>
.list {
  background-color: var(--ion-color-light-shade);
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding: .5rem;
}
</style>