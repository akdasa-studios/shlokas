<template>
  <ion-page ref="page">
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('settings.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content color="light">
      <ion-list :inset="true">
        <ion-item
          :detail="true"
          router-link="/home/settings/account"
          router-direction="forward"
        >
          <ion-label>{{ $t('settings.account') }}</ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            {{ $t('settings.language') }}
          </ion-label>
          <ion-select
            :value="shlokas.settings.language.value.code"
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
      </ion-list>
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { Language } from '@akdasa-studios/shlokas-core'
import {
  IonContent, IonHeader, IonItem, IonLabel, IonList,
  IonPage, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar
} from '@ionic/vue'
import { shlokas } from '@/application'

async function languageChanged(e: any) {
  const lang = shlokas.settings.availableLanguages.find(x => x.code === e.detail.value)
  await shlokas.settings.changeLanguage(lang as Language)
}
</script>
