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
            v-for="lang in root.settings.availableLanguages"
            :key="lang.code"
            :value="lang.code"
          >
            {{ lang.name }}
          </ion-select-option>
        </ion-select>
      </ion-item>
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { Language } from '@akdasa-studios/shlokas-core'
import {
  IonContent, IonHeader, IonItem, IonLabel, IonPage,
  IonTitle, IonToolbar, IonSelect, IonSelectOption
} from '@ionic/vue'
import { ref } from 'vue'
import { root } from '@/application'

const value = ref(root.settings.language.value.code)

function languageChanged(e: any) {
  const lang = root.settings.availableLanguages.find(x => x.code === e.detail.value)
  root.settings.changeLanguage(lang as Language)
}
</script>
