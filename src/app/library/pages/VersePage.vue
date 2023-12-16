<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button
            :disabled="isAlreadyAdded"
            @click="onAddVerseToInboxClicked"
          >
            {{ $t('common.add') }}
          </ion-button>
        </ion-buttons>

        <ion-buttons slot="secondary">
          <ion-back-button />
        </ion-buttons>

        <ion-title v-if="verse">
          {{ verse.number.value }}
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <VerseDetails
        v-if="verse"
        :verse="verse"
        :verse-images="verseImages"
        :declamations="declamations"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, useIonRouter } from '@ionic/vue'
import { computed, onMounted, shallowRef } from 'vue'
import { AddVerseToInboxDeck, Decks, Declamation, UpdateVerseStatus, Verse, VerseId, VerseImage, VerseStatus } from '@akdasa-studios/shlokas-core'
import { Transaction } from '@akdasa-studios/framework'
import { VerseDetails } from '@/app/library'
import { go, useApplication } from '@/app/shared'
import { TutorialSteps, useTutorialStore } from '@/app/tutorial'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  id: string,
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const application = useApplication()
const router = useIonRouter()
const tutorial = useTutorialStore()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const verse = shallowRef<Verse>()
const status = shallowRef<VerseStatus>()
const verseImages = shallowRef<VerseImage[]>([])
const declamations = shallowRef<Declamation[]>([])
const isAlreadyAdded = computed(() => status.value?.inDeck !== Decks.None)


/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

onMounted(fetchData)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onAddVerseToInboxClicked() {
  if (!verse.value) { return }

  // Tutorial: Do not allow user to add any other verse than BG 1.1 during tutorial
  if (tutorial.isEnabled && (tutorial.currentStep !== TutorialSteps.LibraryAddVerse || verse.value.reference !== 'BG 1.1')) {
    tutorial.invalidAction()
    return
  }

  const app = application.instance()
  const transaction = new Transaction()
  await app.execute(new AddVerseToInboxDeck(verse.value.id), transaction)
  await app.execute(new UpdateVerseStatus(verse.value.id), transaction)
  if (router.canGoBack()) { router.back() } else { router.push(go('library')) }
  completeTutorialStep(TutorialSteps.LibraryAddVerse)
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

async function fetchData() {
  const app = application.instance()
  const verseId = new VerseId(props.id)
  const [_verse, _status, _images] = await Promise.all([
    app.library.getById(verseId),
    app.library.getStatus(verseId),
    app.library.getImages(verseId),
  ])
  const [_declamations, _d2] = await Promise.all([
    app.library.getDeclamations(verseId), // todo: pass array
    app.library.getDeclamations(_verse.reference)
  ])

  verse.value = _verse
  status.value = _status
  verseImages.value = Array.from(_images)
  declamations.value = [..._declamations, ..._d2]
}

/* -------------------------------------------------------------------------- */
/*                                  Tutorial                                  */
/* -------------------------------------------------------------------------- */

onMounted(() => {
  completeTutorialStep(TutorialSteps.LibraryOpenVerse)
})

function completeTutorialStep(step: TutorialSteps) {
  tutorial.completeStep(step)
}
</script>
