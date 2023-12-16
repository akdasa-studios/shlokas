<template>
  <ion-item
    @click="onClick"
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
import { IonItem, IonLabel, IonIcon, useIonRouter } from '@ionic/vue'
import { computed } from 'vue'
import { enter, albums } from 'ionicons/icons'
import { go, testId } from '@/app/shared'
import { TutorialSteps, useTutorialStore } from '@/app/tutorial'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verse: Verse,
  verseStatus: VerseStatus
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const tutorialStore = useTutorialStore()


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


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onClick() {
  // Tutorial: Don't allow opening any verse other than BG 1.1
  if (tutorialStore.isEnabled && ((tutorialStore.currentStep < TutorialSteps.LibraryOpenVerse && tutorialStore.currentStep > TutorialSteps.LibraryAddVerse) || props.verse.reference !== 'BG 1.1')) {
    tutorialStore.invalidAction()
    return
  }
  openVerse()
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function openVerse() {
  router.push(go('library:verse', {id:props.verse.id.value}))
}
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
