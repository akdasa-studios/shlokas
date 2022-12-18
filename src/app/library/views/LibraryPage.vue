<template>
  <ion-page ref="page">
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ t('library') }}</ion-title>
      </ion-toolbar>

      <ion-toolbar>
        <ion-searchbar
          v-model="library.searchQuery.value"
          :placeholder="t('search')"
          animated
        />
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item
          v-for="verse in library.filteredVerses.value"
          :key="verse.number"
          text-wrap
          @click="library.openModal(verse.$verse.object)"
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
        :is-open="library.isModalOpen.value"
        :presenting-element="presentingElement"
        @will-dismiss="(v) => library.closeModal(v)"
      >
        <VerseDialog
          :can-add="!library.openedVerse.isAlreadyAdded"
          :verse-id="library.openedVerse.$verse.object.id"
          :title="library.openedVerse.number"
          :translation="library.openedVerse.translation"
          :text="library.openedVerse.text"
        />
      </ion-modal>

      <!-- Toast -->
      <ion-toast
        position="top"
        :message="t('verseAdded', { verseNumber: library.openedVerse.number })"
        :buttons="[{ text: 'Revert', role: 'cancel', handler: () => library.revertLastAction() }]"
        :is-open="library.isToastOpen.value"
        :duration="2000"
        color="dark"
        @did-dismiss="() => library.closeToast()"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage,
  IonSearchbar, IonTitle, IonToolbar, IonModal, IonToast, IonBadge
} from '@ionic/vue'
import { VerseDialog } from '@/app/library/views'

import { onMounted, ref } from 'vue'
import { library } from '@/application'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const page = ref(null)
const presentingElement = ref(null)

onMounted(() => { presentingElement.value = page.value.$el })
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

<i18n locale="en" lang="yaml">
library: Library
search: Query
verseAdded: Verse <b>{verseNumber}</b> added to inbox
</i18n>


<i18n locale="ru" lang="yaml">
library: Library
search: Query
verseAdded: Стих {verseNumber} добавлен во входящие
</i18n>
