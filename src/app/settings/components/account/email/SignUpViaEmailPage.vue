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
        <ion-title>Sign Up</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div
        v-if="showVerifyEmail"
        class="ion-padding alert"
      >
        To complete your registration, please confirm that you have
        received the email that was sent to you. Thank you
      </div>

      <ion-list>
        <!-- Name -->
        <ion-item class="ion-no-padding">
          <ion-label position="stacked">
            Name
          </ion-label>
          <ion-input
            v-model="name"
          />
        </ion-item>

        <!-- email -->
        <ion-item class="ion-no-padding">
          <ion-label position="stacked">
            EMail
          </ion-label>
          <ion-input
            v-model="email"
            type="email"
          />
        </ion-item>

        <!-- password -->
        <ion-item class="ion-no-padding">
          <ion-label position="stacked">
            Password
          </ion-label>
          <ion-input
            v-model="password"
            type="password"
          />
        </ion-item>
      </ion-list>

      <div>
        <ion-button
          expand="block"
          @click="onSignUp"
        >
          Sign Up
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
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,
  IonList, IonItem, IonInput, IonButton, IonLabel, IonPage,
  IonLoading, modalController
} from '@ionic/vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { AuthService } from '@/services/AuthService'
import { useAccountStore } from '@/app/settings'
import { AUTH_HOST } from '@/app/Env'

const account = useAccountStore()
const { name, email, password } = storeToRefs(account)

const inProgress = ref(false)
const showVerifyEmail = ref(false)

async function onSignUp() {
  inProgress.value = true
  await new AuthService(AUTH_HOST).signUp(
    name.value, email.value, password.value,
  )
  inProgress.value = false
  showVerifyEmail.value = true
}

function cancel() {
  return modalController.dismiss(null, 'cancel')
}
</script>

<style scoped>
.alert {
  background-color: var(--ion-color-warning);
  border: 1px solid var(--ion-color-warning-shade);
  border-radius: 10px;
}
</style>