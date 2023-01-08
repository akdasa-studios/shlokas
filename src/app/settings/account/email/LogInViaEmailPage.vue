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
            v-model="email"
            type="email"
          />
        </ion-item>

        <!-- password -->
        <ion-item>
          <ion-label position="stacked">
            Password
          </ion-label>
          <ion-input
            v-model="password"
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
  IonToolbar, IonButtons, modalController
} from '@ionic/vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { AuthService } from '@/services/AuthService'
import { AUTH_HOST } from '@/app/Env'
import { useAccountStore } from '@/app/settings'

const account = useAccountStore()
const { email, password, token } = storeToRefs(account)

const inProgress = ref(false)

async function onLogIn() {
  inProgress.value = true
  const result = await new AuthService(AUTH_HOST).logIn(
    email.value,
    password.value,
  )
  if (result.isSuccess) {
    token.value = result.value
    modalController.dismiss(null, 'ok')
  } else {
    console.log("Ero")
  }
  inProgress.value = false
}

function cancel() {
  return modalController.dismiss(null, 'cancel')
}
</script>
