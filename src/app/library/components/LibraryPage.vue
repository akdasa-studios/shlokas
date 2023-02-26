<template>
  <ion-page ref="page">
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('library.title') }}</ion-title>
      </ion-toolbar>

      <ion-toolbar>
        <ion-searchbar
          v-model="searchQuery"
          :placeholder="$t('library.search')"
          animated
        />
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item
          v-for="verse in filteredVerses"
          :key="verse.number.toString()"
          :data-testid="testId(verse.number)"
          text-wrap
          role="listitem"
          @click="dialogAddVerse.open(verse)"
        >
          <ion-label class="ion-text-wrap">
            <div class="header">
              <h2 class="inline">
                {{ verse.number }}
              </h2>
              <ion-badge
                v-if="verse.showStatus"
                class="badge"
                color="primary"
                role="status"
                :data-testid="testId(verse.number, 'badge')"
              >
                {{ $t(`decks.${verse.status}.title`).toUpperCase() }}
              </ion-badge>
            </div>
            <p>{{ verse.translation }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- Modal -->
      <ion-modal
        :is-open="dialogAddVerse.isOpen.value"
        role="dialog"
        @will-dismiss="(e) => onVerseDialogDismiss(e.detail.role)"
      >
        <AddVerseDialog :verse="dialogAddVerse.data.value" />
      </ion-modal>

      <!-- Toast -->
      <ion-toast
        position="top"
        color="dark"
        :message="$t('decks.inbox.verseAdded', toastVerseAdded.data.value)"
        :is-open="toastVerseAdded.isOpen.value"
        :buttons="[{ text: $t('common.revert'), role: 'cancel', handler: revert }]"
        :duration="2000"
        @did-dismiss="toastVerseAdded.close()"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonBadge, IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal, IonPage,
  IonSearchbar, IonTitle, IonToast, IonToolbar
} from '@ionic/vue'
import { inject } from 'vue'
import { Application } from '@akdasa-studios/shlokas-core'
import { EventEmitter2 } from 'eventemitter2'
import { testId } from '@/app/TestId'
import { AddVerseDialog,  useAddVerse, useLibrary } from '@/app/library'
import { useAudioPlayerStore } from '@/app/shared'


/* -------------------------------------------------------------------------- */
/*                                 Scenarios                                  */
/* -------------------------------------------------------------------------- */

const app = inject('app') as Application
const emitter = inject('emitter') as EventEmitter2
const { toastVerseAdded, dialogAddVerse, addVerseToInbox, revert } = useAddVerse(app)
const { searchQuery, filteredVerses } = useLibrary(app, emitter)
const { close } = useAudioPlayerStore()

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onVerseDialogDismiss(action: string) {
  dialogAddVerse.close()
  close()
  if (action === 'confirm') {
    await addVerseToInbox(dialogAddVerse.data.value)
  }
}
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
