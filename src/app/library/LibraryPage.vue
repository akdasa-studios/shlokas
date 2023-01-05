<template>
  <ion-page ref="page">
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('library.title') }}</ion-title>
      </ion-toolbar>

      <ion-toolbar>
        <ion-searchbar
          v-model="vm.filterQuery.value"
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
          v-for="verse in vm.filteredVerses.value"
          :key="verse.number.toString()"
          :data-testid="testId(verse.number.value)"
          text-wrap
          role="listitem"
          @click="vm.verseDialog.open(verse)"
        >
          <ion-label class="ion-text-wrap">
            <div class="header">
              <h2 class="inline">
                {{ verse.number.value }}
              </h2>
              <ion-badge
                v-if="verse.showStatus.value"
                class="badge"
                color="medium"
                :data-testid="testId(verse.number.value, 'badge')"
              >
                {{ verse.status.value }}
              </ion-badge>
            </div>
            <p>{{ verse.translation.value }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- Modal -->
      <ion-modal
        :is-open="vm.verseDialog.isOpen.value"
        :presenting-element="presentingElement"
        role="dialog"
        @will-dismiss="onVerseDialogDismiss"
      >
        <VerseDialog :verse="vm.verseDialog.verse" />
      </ion-modal>

      <!-- Toast -->
      <ion-toast
        position="top"
        :message="$t('decks.inbox.verseAdded', { verseNumber: vm.verseDialog.verse.number.value })"
        :buttons="[{ text: 'Revert', role: 'cancel', handler: async () => await vm.verseAddedToast.revert() }]"
        :is-open="vm.verseAddedToast.isOpen.value"
        :duration="2000"
        color="dark"
        @did-dismiss="async () => await vm.verseAddedToast.close()"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonBadge, IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal, IonPage,
  IonSearchbar, IonTitle, IonToast, IonToolbar
} from '@ionic/vue'
import { onMounted, ref } from 'vue'
import { OverlayEventDetail } from '@ionic/core'
import { VerseDialog } from '@/app/library'
import { testId } from '@/app/TestId'
import { shlokas } from '@/application'


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const vm = shlokas.library
const page = ref(null)
const presentingElement = ref(null)

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

onMounted(() => {
  presentingElement.value = page.value.$el
  vm.open()
})

async function onVerseDialogDismiss(event: CustomEvent<OverlayEventDetail>) {
  await vm.closeModal(event.detail.role || "")
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
