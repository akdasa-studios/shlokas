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
      <h1 v-if="isAuthenticated">
        Welcome back!
      </h1>

      <ion-button
        v-if="!isAuthenticated"
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
        v-if="!isAuthenticated"
        expand="block"
        fill="clear"
        @click="openModal(SignUpViaEmailPage)"
      >
        Sign Up
      </ion-button>

      <ion-button
        v-if="isAuthenticated"
        fill="outline"
        expand="block"
        @click="logOut"
      >
        Log Out
      </ion-button>

      <ion-button
        v-if="isAuthenticated"
        expand="block"
        fill="outline"
        @click="onSync"
      >
        Force Syncing
      </ion-button>

      <ion-button
        v-if="isAuthenticated"
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
  IonHeader, IonPage, IonTitle, IonToolbar, IonLoading,
  IonIcon, modalController
} from '@ionic/vue'
import { mail } from 'ionicons/icons'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Storage } from '@ionic/storage'
import { useAccountStore } from '@/app/settings'
import { couchDB } from '@/app/Application'
import LogInViaEmailPage from './email/LogInViaEmailPage.vue'
import SignUpViaEmailPage from './email/SignUpViaEmailPage.vue'

const inProgress = ref(false)

const deviceStorage = new Storage()
deviceStorage.create()

const account = useAccountStore(deviceStorage)
const { isAuthenticated, syncHost } = storeToRefs(account)
const { logOut } = account

async function openModal(component: any) {
  const modal = await modalController.create({ component })
  modal.present()
}

async function onSync() {
  inProgress.value = true
  await couchDB.sync(syncHost.value)
  inProgress.value = false
}

async function onClean() {
  inProgress.value = true
  await couchDB.deleteAll()
  inProgress.value = false
}
</script>
