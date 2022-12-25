<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="primary">
        <ion-button
          v-if="!props.verse.isAlreadyAdded"
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
          {{ $t('common.cancel') }}
        </ion-button>
      </ion-buttons>

      <ion-title>{{ props.verse.number }}</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content
    class="ion-padding"
    data-testid="verseViewDialog"
  >
    <div class="text">
      <div
        v-for="line, id in props.verse.text"
        :key="id"
      >
        {{ line }}
      </div>
    </div>

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
import { VerseViewModel } from './VerseViewModel'


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verse: VerseViewModel,
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
</style>