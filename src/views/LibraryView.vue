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
          :key="verse.number.value"
          text-wrap
          @click="library.openModal(verse)"
        >
          <ion-label class="ion-text-wrap">
            <h2>{{ verse.number }}</h2>
            <p>{{ verse.translation.text }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- Modal -->
      <ion-modal
        :is-open="library.isModalOpen.value"
        :presenting-element="presentingElement"
        @will-dismiss="(v) => library.closeModal(v)"
      >
        <VerseView
          :verse-id="library.modalVerse.value.verseId"
          :title="library.modalVerse.value.title"
          :translation="library.modalVerse.value.translation"
          :text="library.modalVerse.value.text"
        />
      </ion-modal>

      <ion-toast
        position="top"
        :message="t('verseAdded', { verseNumber: library.modalVerse.value.title })"
        :buttons="[{ text: 'Revert', role: 'cancel', handler: () => library.revert() }]"
        :is-open="library.isToastOpen.value"
        :duration="2000"
        @did-dismiss="library.isToastOpen.value = false"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage,
  IonSearchbar, IonTitle, IonToolbar, IonModal, IonToast
} from '@ionic/vue'
import { onMounted, ref } from 'vue'
import { useApp } from '@/application'
import { useLibrary } from '@/viewModels/library/LibraryViewModel'
import { useI18n } from 'vue-i18n'
import VerseView from '@/views/VerseView.vue'

const { t } = useI18n()
const library = useLibrary(useApp())

const page = ref(null)
const presentingElement = ref(null)
onMounted(() => {
  console.log("onMounted", page.value)
  presentingElement.value = page.value.$el
})
</script>

<style scoped>
</style>


<i18n src="@/locale/common.yml" lang="yaml" />

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
