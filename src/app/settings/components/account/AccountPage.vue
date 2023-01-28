<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title>{{ $t('settings.account') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h1 v-if="isAuthenticated">
        {{ $t('account.welcomeBack') }}
      </h1>

      <span v-if="token">
        {{ $t('account.token.validTill') }}:
        {{ new Date(token.expires).toLocaleString() }}
      </span>

      <ion-button
        v-if="!isAuthenticated"
        expand="block"
        @click="openModal(LogInViaEmailPage)"
      >
        <ion-icon
          slot="start"
          :icon="mail"
        />
        {{ $t('account.logIn') }}
      </ion-button>

      <ion-button
        v-if="!isAuthenticated"
        expand="block"
        fill="clear"
        @click="openModal(SignUpViaEmailPage)"
      >
        {{ $t('account.signUp') }}
      </ion-button>

      <ion-button
        v-if="isAuthenticated"
        fill="outline"
        expand="block"
        @click="logOut"
      >
        {{ $t('account.logOut') }}
      </ion-button>

      <ion-button
        v-if="isAuthenticated"
        expand="block"
        fill="outline"
        @click="onSync"
      >
        {{ $t('account.syncData') }}
      </ion-button>

      <ion-button
        expand="block"
        fill="outline"
        @click="onClean"
      >
        {{ $t('account.deleteAllData') }}
      </ion-button>

      <ion-button
        v-if="isAuthenticated"
        expand="block"
        fill="outline"
        @click="onRefreshToken"
      >
        {{ $t('account.token.refresh') }}
      </ion-button>
    </ion-content>

    <ion-loading
      :is-open="inProgress"
      :duration="3000"
      :message="$t('common.wait')"
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
import { useAccountStore } from '@/app/settings'
import { couchDB } from '@/app/Application'
import { AuthService } from '@/services/AuthService'
import { AUTH_HOST } from '@/app/Env'
import LogInViaEmailPage from './email/LogInViaEmailPage.vue'
import SignUpViaEmailPage from './email/SignUpViaEmailPage.vue'

const inProgress = ref(false)

const account = useAccountStore()
const { isAuthenticated, syncHost, token } = storeToRefs(account)
const { logOut, load } = account

load()

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

async function onRefreshToken() {
  const service = new AuthService(AUTH_HOST)
  token.value.expires = (await service.refreshToken(token.value)).expires
}
</script>
