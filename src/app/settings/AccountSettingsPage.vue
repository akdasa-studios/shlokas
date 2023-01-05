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

    <ion-content>
      <ion-list
        lines="full"
        class="ion-no-margin ion-no-padding"
      >
        <!-- email -->
        <ion-item>
          <ion-label position="stacked">
            EMail
          </ion-label>
          <ion-input
            v-model="shlokas.settings.login.value"
            type="email"
          />
        </ion-item>

        <!-- password -->
        <ion-item>
          <ion-label position="stacked">
            Password
          </ion-label>
          <ion-input
            v-model="shlokas.settings.password.value"
            type="password"
          />
        </ion-item>
      </ion-list>

      <div class="ion-padding">
        <ion-button
          v-if="!isRegistered"
          expand="block"
          @click="onRegister"
        >
          Create account
        </ion-button>

        <ion-button
          v-else
          expand="block"
          @click="onLogOut"
        >
          Log Out
        </ion-button>

        <ion-button
          v-if="isRegistered"
          expand="block"
          fill="outline"
          @click="onSync"
        >
          Force Syncing
        </ion-button>

        <ion-button
          v-if="isRegistered"
          expand="block"
          fill="outline"
          @click="onClean"
        >
          Delete all data
        </ion-button>
      </div>


      <ion-loading
        :is-open="inProgress"
        :duration="3000"
        message="Please wait..."
        @did-dismiss="inProgress = false"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons,
  IonList, IonItem, IonInput, IonButton, IonLabel, IonPage, IonLoading
} from '@ionic/vue'
import { ref, computed } from 'vue'
import { couchDB, shlokas } from '@/application'

const inProgress = ref(false)
const isRegistered = computed(() => !!shlokas.settings.dbName.value)

async function onRegister() {
  inProgress.value = true
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
  console.log(response)
  if (response.success) { shlokas.settings.dbName.value = response.db }
  inProgress.value = false
}

function onLogOut() {
  shlokas.settings.login.value = ""
  shlokas.settings.password.value = ""
  shlokas.settings.dbName.value = ""
}

async function onSync() {
  inProgress.value = true
  await couchDB.sync(shlokas.settings.syncServer.value)
  inProgress.value = false
}

async function onClean() {
  inProgress.value = true
  await couchDB.deleteAll()
  inProgress.value = false
}
</script>
