<template>
  <FlipCard
    :data-testid="testId(verse.number.value, 'card', card.type)"
    :data-index="index"
    :flipped="props.flipped"
    :show-overlay="props.showOverlay"
    side-class="side side-color-0"
    card-class="padding"
    @click.stop="onCardFlipped"
  >
    <template #front>
      <InboxCardVerseTextSide
        v-if="props.card.type === InboxCardType.Text"
        :verse-number="props.verse.number.value"
        :lines="props.verse.text.lines"
      />

      <InboxCardTranslationSide
        v-if="card.type === InboxCardType.Translation"
        :verse-number="props.verse.number.value"
        :translation="props.verse.translation.text"
      />
    </template>

    <template #back>
      <InboxCardDeclamationsSide
        v-if="index === 0 && props.declamations.length > 0"
        :declamations="props.declamations"
        :synonyms="props.verse.synonyms"
      />
      <InboxCardSynonymsSide
        :synonyms="props.verse.synonyms"
      />
    </template>
  </FlipCard>
</template>


<script lang="ts" setup>
import { Declamation, InboxCard, InboxCardType, Verse } from '@akdasa-studios/shlokas-core'
import { FlipCard } from '@akdasa-studios/shlokas-uikit'
import { defineEmits, defineProps, ref } from 'vue'
import { testId } from '@/app/TestId'
import { InboxCardDeclamationsSide, InboxCardTranslationSide, InboxCardVerseTextSide, InboxCardSynonymsSide } from '@/app/decks/inbox'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  card: InboxCard
  verse: Verse
  flipped: boolean
  index: number
  showOverlay: boolean
  declamations: Declamation[]
}>()

const emit = defineEmits<{
  (event: 'flip'): void
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const hue = ref(0)
setInterval(() => hue.value += 10, 100)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onCardFlipped() { emit('flip') }
</script>


<style scoped>
.color-shift {
  filter: hue-rotate(calc(v-bind(hue) * 1deg));
}
</style>