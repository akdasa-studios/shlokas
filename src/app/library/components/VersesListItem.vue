<template>
  <ion-item
    :router-link="linkToVerse"
  >
    <ion-label text-wrap>
      <h2 class="verse-number">
        <span class="number">
          {{ verse.number.value }}
        </span>
        <ion-icon
          v-if="deckIcon"
          class="icon"
          size="small"
          color="primary"
          :icon="deckIcon"
        />
        <span
          v-if="showBadge"
          class="status"
          :data-testid="testId(verse.number.value, 'badge')"
        >
          {{ $t(`decks.${props.verseStatus.inDeck.toLowerCase()}.title`) }}
        </span>
      </h2>

      <p>{{ props.verse.translation.text }}</p>
    </ion-label>
  </ion-item>
</template>


<script lang="ts" setup>
import { Decks, Verse, VerseStatus } from '@akdasa-studios/shlokas-core'
import { IonItem, IonLabel, IonIcon } from '@ionic/vue'
import { computed } from 'vue'
import { enter, albums } from 'ionicons/icons'
import { go } from '@/app/shared'
import { testId } from '@/app/TestId'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verse: Verse,
  verseStatus: VerseStatus
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const deckIcons = {
  [Decks.None]: undefined,
  [Decks.Inbox]: enter,
  [Decks.Review]: albums,
}

const deckIcon = computed(() => deckIcons[props.verseStatus.inDeck])
const showBadge = computed(() => props.verseStatus.inDeck != Decks.None)
const linkToVerse = go('library:verse', {id:props.verse.id.value})
</script>


<style scoped>
.verse-number {
  display: flex;
  align-items: center;
  gap: .5rem;
}

.status {
  color: var(--ion-color-primary);
  font-size: 1rem;
  text-transform: lowercase;
  text-align: center;
}
</style>
