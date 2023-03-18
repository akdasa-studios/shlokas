<template>
  <div>
    <VerseAudioPlayer
      :url="env.getContentUrl(declamations[activeDeclamationIdx].url)"
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
import { useEnv, VerseAudioPlayer } from '@/app/shared'
import { DeclamationsList } from '@/app/library'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  title: string,
  declamations: Declamation[],
}>()

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const env = useEnv()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const declamations = useSorted(props.declamations, (a,b) => getSortScore(a) - getSortScore(b))
const declamationsCount = computed(() => declamations.value.length)
const activeDeclamationIdx = ref(0)


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