<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title>Account</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h1 v-if="shlokas.settings.isAuthenticated.value">
        Welcome back!
      </h1>

      <ion-button
        v-if="!shlokas.settings.isAuthenticated.value"
        expand="block"
        @click="openModal(LogInViaEmailPage)"
      >
        <ion-icon
          slot="start"
          :icon="mail"
        />
        Log In
      </ion-button>

      <ion-button
        v-if="!shlokas.settings.isAuthenticated.value"
        expand="block"
        fill="clear"
        @click="openModal(SignUpViaEmailPage)"
      >
        Sign Up
      </ion-button>

      <ion-button
        v-if="shlokas.settings.isAuthenticated.value"
        fill="outline"
        expand="block"
        @click="onLogOut"
      >
        Log Out
      </ion-button>

      <ion-button
        v-if="shlokas.settings.isAuthenticated.value"
        expand="block"
        fill="outline"
        @click="onSync"
      >
        Force Syncing
      </ion-button>

      <ion-button
        v-if="shlokas.settings.isAuthenticated.value"
        expand="block"
        fill="outline"
        @click="onClean"
      >
        Delete all data
      </ion-button>
    </ion-content>

    <ion-loading
      :is-open="inProgress"
      :duration="3000"
      message="Please wait..."
      @did-dismiss="inProgress = false"
    />
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonBackButton, IonButton, IonButtons, IonContent,
  IonHeader, IonPage, IonTitle, IonToolbar, modalController
} from '@ionic/vue'
import { mail } from 'ionicons/icons'
import { ref } from 'vue'
import { couchDB, shlokas } from '@/application'
import LogInViaEmailPage from './email/LogInViaEmailPage.vue'
import SignUpViaEmailPage from './email/SignUpViaEmailPage.vue'

const inProgress = ref(false)


async function openModal(component) {
  const modal = await modalController.create({ component })
  modal.present()
}

function onLogOut() {
  shlokas.settings.name.value = ""
  shlokas.settings.email.value = ""
  shlokas.settings.password.value = ""
  shlokas.settings.authToken.value = undefined
}

async function onSync() {
  inProgress.value = true
  await couchDB.sync(shlokas.settings.dbConnectionString.value)
  inProgress.value = false
}

async function onClean() {
  inProgress.value = true
  await couchDB.deleteAll()
  inProgress.value = false
}
</script>
