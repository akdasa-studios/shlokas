<template>
  <div class="synonyms">
    <span
      v-for="synonym in filteredSynonyms"
      :key="synonym.word"
    >
      <span class="word">{{ synonym.word }}</span> –
      {{ synonym.translation }};
    </span>
  </div>
</template>


<script lang="ts" setup>
import { Synonym } from '@akdasa-studios/shlokas-core'
import { useArrayFilter } from '@vueuse/shared'
import { toRefs } from 'vue'

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

const { lineNumber, synonyms } = toRefs(props)
const filteredSynonyms = useArrayFilter(synonyms,
  x => x.lineNumber === lineNumber?.value || lineNumber?.value === undefined
)
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