<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="primary">
        <ion-button
          v-if="!props.verse.isAlreadyAdded.value"
          data-testid="addVerseToInbox"
          @click="onAddClicked"
        >
          {{ $t('common.add') }}
        </ion-button>
      </ion-buttons>

      <ion-buttons slot="secondary">
        <ion-button
          data-testid="closeVerseDialog"
          color="medium"
          @click="onCancelClicked"
        >
          {{ $t('common.close') }}
        </ion-button>
      </ion-buttons>

      <ion-title>
        {{ props.verse.number }}
      </ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content
    class="ion-padding"
    data-testid="verseViewDialog"
  >
    <VerseTextLines
      :lines="props.verse.text"
      class="verse"
    />

    <div class="translation">
      {{ props.verse.translation }}
    </div>
  </ion-content>
</template>


<script lang="ts" setup>
import {
  IonButton, IonButtons, IonContent, IonHeader,
  IonTitle, IonToolbar, modalController
} from '@ionic/vue'
import { defineProps } from 'vue'
import { LibraryVerse } from '@/app/library'
import { VerseTextLines } from '@/app/decks/shared'


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verse: LibraryVerse,
}>()

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onCancelClicked() {
  return modalController.dismiss(null, 'cancel')
}

function onAddClicked() {
  return modalController.dismiss({ verseId: props.verse.verseId }, 'confirm')
}
</script>


<style scoped>
.text {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
  font-style: italic;
}

.translation {
  font-size: 1.2rem;
  line-height: 1.2;
}

.margin {
  margin-top: 1rem;
}

.verse {
  background-color:  var(--ion-color-light);
  border: 1px solid  var(--ion-color-light-shade);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>