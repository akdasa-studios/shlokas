<template>
  <VerseTextLines
    :lines="props.verse.text.lines"
    :uri="verseImage?.url ? env.getContentUrl(verseImage.url) : undefined"
    class="section box"
  />

  <DeclamationsPlayer
    v-if="props.declamations.length > 0"
    class="section box"
    :declamations="props.declamations"
    :title="props.verse.number.value"
  />

  <VerseSynonyms
    class="section"
    :synonyms="props.verse.synonyms"
  />

  <VerseTranslation
    class="section"
    :text="props.verse.translation.text"
  />
</template>


<script lang="ts" setup>
import { defineProps } from 'vue'
import { Declamation, Verse, VerseImage } from '@akdasa-studios/shlokas-core'
import { VerseTextLines } from '@/app/decks/shared'
import { VerseSynonyms, VerseTranslation, DeclamationsPlayer } from '@/app/library'
import { useEnv } from '@/app/shared'

/* -------------------------------------------------------------------------- */
/*                                  Inetrface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verse: Verse,
  verseImages: VerseImage[],
  declamations: Declamation[],
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const env = useEnv()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const verseImage = props.verseImages.find(x => x.theme === 'default')
</script>


<style scoped>
.box {
  background-color:  var(--ion-color-light);
  border: 1px solid var(--ion-color-light-shade);
  border-radius: 5px;
}

.section {
  margin-bottom: 1rem;
}
</style>