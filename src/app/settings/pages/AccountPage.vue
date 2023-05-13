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

      <ion-button
        v-if="!isAuthenticated"
        expand="block"
        router-link="/home/settings/account/email"
      >
        <ion-icon
          slot="start"
          :icon="mail"
        />
        {{ $t('account.logIn') }}
      </ion-button>

      <ion-button
        v-if="isAuthenticated"
        expand="block"
        fill="outline"
        @click="onSync"
      >
        {{ $t('account.syncData') }}
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
  IonHeader, IonPage, IonTitle, IonToolbar, IonLoading, IonIcon
} from '@ionic/vue'
import { mail } from 'ionicons/icons'
import { computed, inject, ref } from 'vue'
import { EventEmitter2 } from 'eventemitter2'
import { Context, TimeMachine } from '@akdasa-studios/shlokas-core'
import { createRepositories } from '@/app/utils/sync'
import { useApplication, useEnv } from '@/app/shared'
import { useSettingsStore } from '@/app/settings'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const inProgress = ref(false)
const emitter = inject('emitter') as EventEmitter2
const application = useApplication()
const settings = useSettingsStore()
const env = useEnv()


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
</script>
