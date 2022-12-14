<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ t('library') }}</ion-title>
      </ion-toolbar>

      <ion-toolbar>
        <ion-searchbar
          v-model="searchQuery"
          :placeholder="t('search')"
          animated
          @ion-cancel="cancel"
        />
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item
          v-for="verse in filteredVerses"
          :key="verse.number.value"
          text-wrap
          @click="openModal(verse)"
        >
          <ion-label class="ion-text-wrap">
            <h2>{{ verse.number }}</h2>
            <p>{{ verse.translation.text }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { useApp } from '@/application'
import VerseView from '@/views/VerseView.vue'
import { Verse } from '@akdasa-studios/shlokas-core'
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar, modalController, toastController } from '@ionic/vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const app = useApp()
const searchQuery = ref("")

const filteredVerses = computed(() => {
  return app.library.finqByString(searchQuery.value)
})
function cancel() { console.log("cancel") }

async function openModal(verse: Verse) {
  const modal = await modalController.create({
    component: VerseView,
    componentProps: {
      verseId: verse.id.value,
      title: verse.number.toString(),
      translation: verse.translation.text,
      text: verse.text.lines,
    }
  })
  modal.present()
  const { data, role } = await modal.onWillDismiss()
  if (role === 'confirm') {
    const toast = await toastController.create({
      message: 'Verse added',
      duration: 1500,
      position: "bottom",
      color: "primary",
      buttons: [
        {
          text: 'Revert',
          role: 'info',
          handler: () => { console.log("REVERT") }
        }
      ],
    });

    await toast.present();
    console.log("data", data)
  }
}
</script>

<style scoped>
</style>


<i18n src="@/locale/common.yml" lang="yaml" />

<i18n locale="en" lang="yaml">
library: Library
search: Query
</i18n>


<i18n locale="ru" lang="yaml">
library: Library
search: Query
</i18n>