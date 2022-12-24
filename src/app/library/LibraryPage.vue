<template>
  <ion-page ref="page">
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('library.title') }}</ion-title>
      </ion-toolbar>

      <ion-toolbar>
        <ion-searchbar
          v-model="shlokas.library.searchQuery.value"
          data-testid="searchbar"
          :placeholder="$t('library.search')"
          animated
        />
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item
          v-for="verse in shlokas.library.filteredVerses.value"
          :key="verse.number"
          :data-testid="testId(verse.number)"
          text-wrap
          role="listitem"
          @click="shlokas.library.openModal(verse.verse)"
        >
          <ion-label class="ion-text-wrap">
            <div class="header">
              <h2 class="inline">
                {{ verse.number }}
              </h2>
              <ion-badge
                v-if="verse.showStatus"
                class="badge"
                color="medium"
                :data-testid="testId(verse.number, 'badge')"
              >
                {{ verse.status }}
              </ion-badge>
            </div>
            <p>{{ verse.translation }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- Modal -->
      <ion-modal
        :is-open="shlokas.library.isModalOpen.value"
        :presenting-element="presentingElement"
        role="dialog"
        @will-dismiss="(v) => shlokas.library.closeModal(v)"
      >
        <VerseDialog
          :can-add="!shlokas.library.openedVerse.isAlreadyAdded"
          :verse-id="shlokas.library.openedVerse.verseId"
          :title="shlokas.library.openedVerse.number"
          :translation="shlokas.library.openedVerse.translation"
          :text="shlokas.library.openedVerse.text"
        />
      </ion-modal>

      <!-- Toast -->
      <ion-toast
        position="top"
        :message="$t('decks.inbox.verseAdded', { verseNumber: shlokas.library.openedVerse.number })"
        :buttons="[{ text: 'Revert', role: 'cancel', handler: () => shlokas.library.revertLastAction() }]"
        :is-open="shlokas.library.isToastOpen.value"
        :duration="2000"
        color="dark"
        @did-dismiss="() => shlokas.library.closeToast()"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage,
  IonSearchbar, IonTitle, IonToolbar, IonModal, IonToast, IonBadge
} from '@ionic/vue'
import { onMounted, ref } from 'vue'
import { VerseDialog } from '@/app/library'
import { testId } from '@/app/TestId'

import { shlokas } from '@/application'

const page = ref(null)
const presentingElement = ref(null)

onMounted(() => {
  presentingElement.value = page.value.$el
})
</script>


<style scoped>
.inline {
  display: inline;
}
.header {
  display: flex;
  align-items: center;
}
.badge {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
