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
import { computed, defineProps, inject, onMounted, shallowRef } from 'vue'
import { AddVerseToInboxDeck, Application, Decks, Declamation, UpdateVerseStatus, Verse, VerseId, VerseImage, VerseStatus } from '@akdasa-studios/shlokas-core'
import { Transaction } from '@akdasa-studios/framework'
import { VerseDetails } from '@/app/library'
import { go } from '@/app/shared'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  id: string,
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const app = inject('app') as Application
const router = useIonRouter()


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

onMounted(onOpened)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onOpened() {
  const verseId = new VerseId(props.id)
  const [_verse, _status, _images, _declamations, _d2] = await Promise.all([
    app.library.getById(verseId),
    app.library.getStatus(verseId),
    app.library.getImages(verseId),
    app.library.getDeclamations(verseId), // todo: pass array
    app.library.getDeclamations('BG 1.1')
  ])
  verse.value = _verse
  status.value = _status
  verseImages.value = Array.from(_images)
  declamations.value = [..._declamations, ..._d2]
}

async function onAddVerseToInboxClicked() {
  if (!verse.value) { return }
  const transaction = new Transaction()
  await app.processor.execute(new AddVerseToInboxDeck(verse.value.id), transaction)
  await app.processor.execute(new UpdateVerseStatus(verse.value.id), transaction)
  if (router.canGoBack()) { router.back() } else { router.push(go('library')) }
}
</script>