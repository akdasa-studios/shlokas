<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>

        <ion-buttons slot="primary">
          <BackgroundTasks />
        </ion-buttons>

        <ion-title>{{ $t('settings.account') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h1 v-if="isAuthenticated">
        {{ $t('account.welcomeBack') }}
      </h1>

      <IonButton
        v-if="!isAuthenticated && platform === 'ios'"
        expand="block"
        color="dark"
        @click="onSignIn('apple')"
      >
        <ion-icon
          slot="start"
          :icon="logoApple"
        />
        {{ $t("welcome.login.withAppleId") }}
      </IonButton>
      <IonButton
        v-if="!isAuthenticated && platform !== 'web'"
        expand="block"
        color="danger"
        @click="onSignIn('google')"
      >
        <ion-icon
          slot="start"
          :icon="logoGoogle"
        />
        {{ $t("welcome.login.withGoogle") }}
      </IonButton>
      <IonButton
        v-if="!isAuthenticated"
        expand="block"
        @click="onEmailSignIn"
      >
        <ion-icon
          slot="start"
          :icon="mail"
        />
        {{ $t("welcome.login.withEmail") }}
      </IonButton>

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
        @click="onLogOut"
      >
        {{ $t('account.logOut') }}
      </ion-button>
    </ion-content>

    <ion-loading
      data-testid="syncing-progress"
      :is-open="syncTask.inProgress"
      :duration="3000"
      :message="$t('common.wait')"
    />
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonBackButton, IonButton, IonButtons, IonContent,
  IonHeader, IonPage, IonTitle, IonToolbar, IonLoading, IonIcon, useIonRouter, alertController
} from '@ionic/vue'
import { mail, logoApple, logoGoogle } from 'ionicons/icons'
import { computed, inject } from 'vue'
import { Capacitor } from '@capacitor/core'
import { go, useAuthentication, useEmitter, useSync , BackgroundTasks } from '@/app/shared'
import { useSettingsStore } from '@/app/settings'
import { CouchDB } from '@/services/persistence'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const userDataDb = inject('userData') as CouchDB
const emitter = useEmitter()
const settings = useSettingsStore()
const auth = useAuthentication()
const router = useIonRouter()
const syncTask = useSync()
const platform = Capacitor.getPlatform()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const isAuthenticated = computed(() => !!settings.auth.token)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onSync() {
  await syncTask.run({ force: true })
  emitter.emit('syncCompleted')
}

async function onSignIn(strategy: string) {
  try {
    await auth.authenticate(strategy)
    await syncTask.run()
  } catch (e) {
    const alert = await alertController.create({
      header: 'Error',
      subHeader: `Unable to sign in with ${strategy}.`,
      message: ((e as Error).message),
      buttons: ['OK'],
    })
    await alert.present()
  }
}

async function onEmailSignIn() {
  router.push(go('settings-account-email'))
}

async function onLogOut() {
  settings.auth.sessionId = ''
  settings.auth.token = ''
  settings.auth.collectionId = ''
  settings.auth.strategy = ''
  settings.auth.expiresAt = undefined
  settings.auth.refreshedAt = undefined
  settings.sync.lastSyncTime = 0
  await userDataDb.destroy()
  emitter.emit('syncCompleted')
}
</script>
