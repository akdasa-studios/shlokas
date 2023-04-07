<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button
            color="medium"
            @click="cancel"
          >
            {{ $t('common.cancel') }}
          </ion-button>
        </ion-buttons>
        <ion-title>{{ $t('account.signUp') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list :inset="true">
        <!-- Name -->
        <ion-item>
          <ion-input
            v-model="name"
            :label="$t('account.name')"
            label-placement="stacked"
          />
        </ion-item>

        <!-- email -->
        <ion-item>
          <ion-input
            v-model="email"
            type="email"
            :label="$t('account.email')"
            label-placement="stacked"
          />
        </ion-item>

        <!-- password -->
        <ion-item>
          <ion-input
            v-model="password"
            type="password"
            :label="$t('account.password')"
            label-placement="stacked"
          />
        </ion-item>
      </ion-list>

      <div class="ion-padding">
        <ion-button
          expand="block"
          @click="onSignUp"
        >
          {{ $t('account.signUp') }}
        </ion-button>
      </div>

      <ion-loading
        :is-open="inProgress"
        :duration="3000"
        :message="$t('common.wait')"
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

async function onSignUp() {
  inProgress.value = true
  await new AuthService(AUTH_HOST).signUp(
    name.value, email.value, password.value,
  )
  modalController.dismiss(null, 'ok')
  inProgress.value = false
}

function cancel() {
  return modalController.dismiss(null, 'cancel')
}
</script>
