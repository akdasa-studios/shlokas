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

      <IonButton
        v-if="!isAuthenticated"
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
        v-if="!isAuthenticated"
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
  IonHeader, IonPage, IonTitle, IonToolbar, IonLoading, IonIcon, useIonRouter, alertController
} from '@ionic/vue'
import { mail, logoApple, logoGoogle } from 'ionicons/icons'
import { computed, inject, ref } from 'vue'
import { EventEmitter2 } from 'eventemitter2'
import { Context, TimeMachine } from '@akdasa-studios/shlokas-core'
import { createRepositories } from '@/app/utils/sync'
import { go, useApplication, useAuthentication, useEnv } from '@/app/shared'
import { useSettingsStore } from '@/app/settings'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const inProgress = ref(false)
const emitter = inject('emitter') as EventEmitter2
const application = useApplication()
const settings = useSettingsStore()
const env = useEnv()
const auth = useAuthentication()
const router = useIonRouter()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const isAuthenticated = computed(() => !!settings.auth.token)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onSync() {
  inProgress.value = true
  const remoteRepos = createRepositories(
    env.getDatabaseUrl(settings.auth.collectionId),
    settings.auth.token
  )
  await application.instance().sync(new Context('sync', new TimeMachine(), remoteRepos))
  emitter.emit('syncCompleted')
  setTimeout(() => inProgress.value = false, 2500)
}


async function onSignIn(strategy: string) {
  try {
    await auth.authenticate(strategy)
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
  router.push(go('welcome-email'))
}

async function onLogOut() {
  settings.auth.sessionId = ''
  settings.auth.token = ''
}
</script>
