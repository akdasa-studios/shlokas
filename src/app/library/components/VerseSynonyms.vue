<template>
  <div class="synonyms">
    <span
      v-for="synonym in getSynonnyms(props.lineNumber)"
      :key="synonym.word"
    >
      <span class="word">{{ synonym.word }}</span> –
      {{ synonym.translation }};
    </span>
  </div>
</template>


<script lang="ts" setup>
import { Synonym } from '@akdasa-studios/shlokas-core'
import { defineProps } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  synonyms: Synonym[],
  lineNumber?: number
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function getSynonnyms(lineNumber: number|undefined) {
  if (lineNumber === undefined) return props.synonyms
  return props.synonyms.filter(x => x.lineNumber == lineNumber)
}
</script>


<style scoped>
.synonyms {
  line-height: 1.2;
  font-size: 1.2rem;
}

.word {
  font-style: italic;
  font-weight: bold;
}
</style>