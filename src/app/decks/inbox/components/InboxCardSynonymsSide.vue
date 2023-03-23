<template>
  <VerseSynonyms
    :synonyms="props.synonyms"
  />
</template>


<script lang="ts" setup>
import { Synonym } from '@akdasa-studios/shlokas-core'
import { defineProps } from 'vue'
import { VerseSynonyms } from '@/app/library'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  synonyms: Synonym[]
}>()
</script>

