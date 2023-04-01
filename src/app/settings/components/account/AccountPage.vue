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
      <div
        v-if="showVerifyEmail"
        class="ion-padding alert"
        data-testid="verifyEmail"
      >
        {{ $t('account.confirmEmail') }}
      </div>

      <h1 v-if="isAuthenticated">
        {{ $t('account.welcomeBack') }}
      </h1>

      <div v-if="token">
        {{ $t('account.token.validTill') }}:
        {{ new Date(token.expires).toLocaleString() }}
      </div>

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
        v-if="isAuthenticated"
        expand="block"
        fill="outline"
        @click="onRefreshToken"
      >
        {{ $t('account.token.refresh') }}
      </ion-button>
    </ion-content>

    <ion-loading
      data-testid="syncing-progress"
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
import { computed, inject, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { EventEmitter2 } from 'eventemitter2'
import { Context, TimeMachine } from '@akdasa-studios/shlokas-core'
import { useAccountStore } from '@/app/settings'
import { AuthService } from '@/services/AuthService'
import { AUTH_HOST } from '@/app/Env'

import { createRepositories } from '@/app/utils/sync'
import { useApp } from '@/app/shared'
import LogInViaEmailPage from './email/LogInViaEmailPage.vue'
import SignUpViaEmailPage from './email/SignUpViaEmailPage.vue'

const inProgress = ref(false)
const emitter = inject('emitter') as EventEmitter2
const application = useApp()
const account = useAccountStore()
const { isAuthenticated, syncHost, token, email } = storeToRefs(account)
const { logOut } = account

const showVerifyEmail = computed(() => email.value && !token.value)

async function openModal(component: any) {
  const modal = await modalController.create({ component })
  modal.present()
}

async function onSync() {
  inProgress.value = true
  const remoteRepos = createRepositories(syncHost.value as string)
  await application.instance().sync(new Context('sync', new TimeMachine(), remoteRepos))
  emitter.emit('syncCompleted')
  setTimeout(() => inProgress.value = false, 2500)
}

async function onRefreshToken() {
  const service = new AuthService(AUTH_HOST)
  token.value.expires = (await service.refreshToken(token.value)).expires
}
</script>


<style scoped>
.alert {
  color: var(--ion-color-warning-contrast);
  background-color: var(--ion-color-warning);
  border: 1px solid var(--ion-color-warning-shade);
  border-radius: 10px;
}
</style>