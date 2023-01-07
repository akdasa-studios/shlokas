<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button
            color="medium"
            @click="cancel"
          >
            Cancel
          </ion-button>
        </ion-buttons>
        <ion-title>Log In</ion-title>
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
            v-model="shlokas.settings.email.value"
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
          expand="block"
          @click="onLogIn"
        >
          Log In
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
  IonButton, IonContent, IonHeader, IonInput, IonItem,
  IonLabel, IonList, IonLoading, IonPage, IonTitle,
  IonToolbar, modalController
} from '@ionic/vue'
import { ref } from 'vue'
import { shlokas } from '@/application'
import { AuthService } from '@/services/AuthService'

const inProgress = ref(false)

async function onLogIn() {
  inProgress.value = true
  const result = await new AuthService(shlokas.settings.authHost).logIn(
    shlokas.settings.email.value,
    shlokas.settings.password.value,
  )
  if (result.isSuccess) {
    shlokas.settings.authToken.value = result.value
  }
  inProgress.value = false
  return modalController.dismiss(null, 'ok')
}

function cancel() {
  return modalController.dismiss(null, 'cancel')
}
</script>
