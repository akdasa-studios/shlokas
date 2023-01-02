<template>
  <ion-page ref="page">
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('settings.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content>
      <ion-list
        :inset="true"
        lines="full"
      >
        <ion-item>
          <ion-label position="fixed">
            {{ $t('settings.language') }}
          </ion-label>
          <ion-select
            v-model="shlokas.settings.language.value.code"
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
          <ion-label position="floating">
            Login
          </ion-label>
          <ion-input
            v-model="shlokas.settings.login.value"
            placeholder="Login"
          />
        </ion-item>

        <ion-item>
          <ion-label position="floating">
            Password
          </ion-label>
          <ion-input
            v-model="shlokas.settings.password.value"
            type="password"
          />
        </ion-item>

        <ion-item>
          <ion-label position="floating">
            Sync server
          </ion-label>
          <ion-input
            :value="shlokas.settings.syncServer.value"
            placeholder="Sync server"
          />
        </ion-item>

        <ion-item>
          <ion-button
            :color="shlokas.settings.dbName.value ? 'success' : 'primary'"
            @click="onRegister"
          >
            Register
          </ion-button>
          <ion-button
            v-if="shlokas.settings.dbName.value"
            @click="onSync"
          >
            Sync
          </ion-button>
          <ion-button
            @click="onClean"
          >
            Clean
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { Language } from '@akdasa-studios/shlokas-core'
import {
  IonContent, IonHeader, IonItem, IonLabel, IonPage,
  IonTitle, IonToolbar, IonSelect, IonSelectOption, IonToggle,
  IonButton, IonInput, IonList
} from '@ionic/vue'
import { shlokas, couchDB } from '@/application'

function languageChanged(e: any) {
  const lang = shlokas.settings.availableLanguages.find(x => x.code === e.detail.value)
  shlokas.settings.changeLanguage(lang as Language)
}

async function onRegister() {
  const rawResponse = await fetch(shlokas.settings.authHost, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: shlokas.settings.login.value,
      password: shlokas.settings.password.value
    })
  })

  const response = await rawResponse.json()
  if (response.success) { shlokas.settings.dbName.value = response.db }
}
async function onSync() {
  await couchDB.sync(shlokas.settings.syncServer.value)
}
async function onClean() {
  await couchDB.deleteAll()
}
</script>
