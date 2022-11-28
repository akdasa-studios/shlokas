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
          :key="card.id.value"
        >
          {{ card.verseNumber }} {{ card.id.value }}
          <span @click="card.memorized()">
            Memorized
          </span>
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
import { InboxViewModel } from '@/viewModels/inbox'
import { InboxContext } from '@akdasa-studios/shlokas-core/commands/inbox'
import { InboxDeck } from '@akdasa-studios/shlokas-core/models/decks'
import { VerseId } from '@akdasa-studios/shlokas-core/models/verse'

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