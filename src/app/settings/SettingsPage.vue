<template>
  <ion-page ref="page">
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('settings.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content
      :scroll-y="false"
      :scroll-x="false"
      class="ion-padding"
    >
      <ion-item>
        <ion-label>{{ $t('settings.language') }}</ion-label>
        <ion-select
          v-model="value"
          interface="action-sheet"
          placeholder="Language"
          @ion-change="languageChanged"
        >
          <ion-select-option
            v-for="lang in shlokas.settings.availableLanguages"
            :key="lang.code"
            :value="lang.code"
          >
            {{ lang.name }}
          </ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-label>Grade buttons</ion-label>
        <ion-toggle
          slot="end"
          v-model="shlokas.settings.showGradeButtons.value"
        />
      </ion-item>

      <ion-item>
        <ion-button
          @click="onSync"
        >
          Sync
        </ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { Language } from '@akdasa-studios/shlokas-core'
import {
  IonContent, IonHeader, IonItem, IonLabel, IonPage,
  IonTitle, IonToolbar, IonSelect, IonSelectOption, IonToggle,
  IonButton
} from '@ionic/vue'
import { ref } from 'vue'
import { shlokas, couchDB } from '@/application'

const value = ref(shlokas.settings.language.value.code)

function languageChanged(e: any) {
  const lang = shlokas.settings.availableLanguages.find(x => x.code === e.detail.value)
  shlokas.settings.changeLanguage(lang as Language)
}

async function onSync() {
  const res = await couchDB.sync("http://dbreader:12345678@127.0.0.1:5984/shlokas")
  console.log(res)
}
</script>
