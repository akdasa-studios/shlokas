<template>
  <div
    v-if="lineNumber !== undefined"
    class="synonyms"
  >
    <span
      v-for="synonym in filteredSynonyms"
      :key="synonym.word"
    >
      <span class="word">{{ synonym.word }}</span> –
      {{ synonym.translation }};
    </span>
  </div>

  <div
    v-else
    class="synonyms"
  >
    <div
      v-for="ln, key in [...Array(getLinesCount()).keys()]"
      :key="key"
      class="block"
    >
      <span
        v-for="synonym in getSynonymsOfLine(ln)"
        :key="synonym.word"
      >
        <span class="word">{{ synonym.word }}</span> –
        {{ synonym.translation }};
      </span>
    </div>
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

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function getSynonymsOfLine(number: number) {
  return props.synonyms.filter(x => x.lineNumber === number)
}

function getLinesCount() {
  return Math.max(...props.synonyms.map(x => x.lineNumber || 0)) + 1
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

.block {
  margin-bottom: 1rem;
  margin-top: 1rem;
}
</style>