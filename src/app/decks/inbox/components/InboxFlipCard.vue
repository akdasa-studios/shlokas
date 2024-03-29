<template>
  <FlipCard
    :data-testid="testId(verse.number.value, 'card', card.type)"
    :data-index="index"
    :flipped="props.flipped"
    :hue-color-hash="props.verse.number.value+card.type"
    side-class="side side-color-0"
    @click.stop="onCardFlipped"
  >
    <template #front>
      <InboxCardVerseTextSide
        v-if="props.card.type === InboxCardType.Text"
        :verse-image="props.image"
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
        :type="card.type === InboxCardType.Text ? 'verse' : 'translation'"
      />
      <InboxCardSynonymsSide
        v-if="props.declamations.length === 0"
        :synonyms="props.verse.synonyms"
      />
    </template>
  </FlipCard>
</template>


<script lang="ts" setup>
import { Declamation, InboxCard, InboxCardType, Verse, VerseImage } from '@akdasa-studios/shlokas-core'
import { toRefs } from 'vue'
import { InboxCardDeclamationsSide, InboxCardSynonymsSide, InboxCardTranslationSide, InboxCardVerseTextSide } from '@/app/decks/inbox'
import FlipCard from '@/app/decks/shared/components/FlipCard.vue'
import { testId } from '@/app/shared'


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  card: InboxCard
  verse: Verse
  flipped: boolean
  index: number
  declamations: Declamation[]
  image?: VerseImage
}>()

const emit = defineEmits<{
  (event: 'flip'): void
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { index } = toRefs(props)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onCardFlipped() { emit('flip') }
</script>
