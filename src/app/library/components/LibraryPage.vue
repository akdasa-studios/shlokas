<template>
  <ion-page ref="page">
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('library.title') }}</ion-title>
      </ion-toolbar>

      <ion-toolbar>
        <ion-searchbar
          v-model="searchScenario.query.value"
          :placeholder="$t('library.search')"
          animated
        />
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item
          v-for="verse in searchScenario.verses.value"
          :key="verse.number.toString()"
          :data-testid="testId(verse.number)"
          text-wrap
          role="listitem"
          @click="addVerseScenario.dialog.open(verse)"
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
        :is-open="addVerseScenario.dialog.isOpen.value"
        role="dialog"
        @will-dismiss="(e) => onVerseDialogDismiss(e.detail.role)"
      >
        <AddVerseDialog :verse="addVerseScenario.dialog.data.value" />
      </ion-modal>

      <!-- Toast -->
      <ion-toast
        position="top"
        color="dark"
        :message="$t('decks.inbox.verseAdded', addVerseScenario.toast.data.value)"
        :is-open="addVerseScenario.toast.isOpen.value"
        :buttons="[{ text: $t('common.revert'), role: 'cancel', handler: onRevert }]"
        :duration="2000"
        @did-dismiss="addVerseScenario.toast.close()"
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
import { testId } from '@/app/TestId'
import {
  AddVerseDialog, AddVerseToInboxDeckUseCase,
  SearchVersesUseCase
} from '@/app/library'

/* -------------------------------------------------------------------------- */
/*                                 Scenarios                                  */
/* -------------------------------------------------------------------------- */

const addVerseScenario = inject('AddVerseToInboxDeckUseCase') as AddVerseToInboxDeckUseCase
const searchScenario = inject('SearchVersesUseCase') as SearchVersesUseCase

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onVerseDialogDismiss(action: string) {
  addVerseScenario.dialog.close()
  if (action === "confirm") {
    await addVerseScenario.addVerseToInbox(addVerseScenario.dialog.data.value)
  }
}

async function onRevert() {
  await addVerseScenario.revert()
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
