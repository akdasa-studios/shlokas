<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Shlokas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Shlokas
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <div>
        <div
          v-for="card in viewModel.cards.value"
          :key="card.id"
        >
          {{ card.verseNumber }} {{ card.type }}
        </div>
      </div>
      <div @click="viewModel.addVerse(verseToAdd)">
        Add
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue'
import { InboxViewModel } from '@/viewModels/inbox-view-model'
import { InboxContext } from '@/commands/inbox'
import { InboxDeck } from '@/models/decks'
import { VerseId } from '@/models/verse';

defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
  }
});

const verseToAdd = new VerseId()
const viewModel = new InboxViewModel(new InboxContext(new InboxDeck([])))
</script>