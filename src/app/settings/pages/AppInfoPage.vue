<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('app.name') }}</ion-title>

        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>

        <ion-buttons slot="end">
          <ion-button
            v-if="updatesAvailable"
            fill="solid"
            color="warning"
            @click="onUpdateClick"
          >
            {{ $t('settings.update') }}
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content>
      <ion-list
        :inset="true"
      >
        <ion-item
          v-for="item, key in data"
          :key="key"
        >
          <ion-label
            @click="onItemClicked(key)"
          >
            <h3>{{ variableToTitle(key) }}</h3>
            <p>{{ item }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-loading
        :is-open="isUpdating"
        :backgground-disabled="true"
        :duration="5000"
        :message="$t('common.wait')"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
IonButton,
  IonContent, IonHeader, IonItem, IonLabel, IonList,
  IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons,
  IonLoading
} from '@ionic/vue'
import { Deploy } from 'cordova-plugin-ionic'
import { onMounted, reactive, ref } from 'vue'
import { Capacitor } from '@capacitor/core'
import { useAuthentication, useEnv } from '@/app/shared'
import { useSettingsStore } from '../stores/useSettingsStore'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const settingsStore = useSettingsStore()
const env = useEnv()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const data = reactive({
  binaryVersion: 'unknown',
  binaryBuild: 'unknown',
  build: 'unknown',
  version: 'unknown',
  channel: 'unknown',
  collectionId: settingsStore.syncCollectionId || 'unknown',
  sessionId: settingsStore.authSessionId || 'unknown',
  refreshedAt: settingsStore.authRefreshedAt
               ? new Date(settingsStore.authRefreshedAt).toISOString()
               : 'unknown',
  expiresAt: settingsStore.authExpiresAt
             ? new Date(settingsStore.authExpiresAt).toISOString()
             : 'unknown',
  timeToSync: (settingsStore.authExpiresAt - new Date().getTime()) / 1000 / 60,
  now: new Date().toISOString(),
  mode: env.getMode(),
  platform: Capacitor.getPlatform(),
  liveUpdateDisabled: 'unknown',
  liveUpdateMethod: 'unknown'
})

const updatesAvailable = ref(false)
const isUpdating = ref(false)


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onMounted(onLoadAppInfo)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onLoadAppInfo() {
  const version = await Deploy.getCurrentVersion()
  const liveUpdateConfig = await Deploy.getConfiguration()
  data.binaryVersion = version?.binaryVersionName ?? 'unknown'
  data.binaryBuild = version?.binaryVersionCode ?? 'unknown'
  data.version = version?.versionId ?? 'unknown'
  data.build = version?.buildId ?? 'unknown'
  data.channel = version?.channel ?? 'unknown'
  data.liveUpdateDisabled = liveUpdateConfig.disabled.toString()
  data.liveUpdateMethod = liveUpdateConfig.updateMethod

  const updates = await Deploy.checkForUpdate()
  updatesAvailable.value = updates?.available ?? false
}

async function onUpdateClick() {
  isUpdating.value = true
  await Deploy.sync({
    updateMethod: 'auto',
  })
  isUpdating.value = false
}

async function onItemClicked(key: string) {
  if (['sessionId', 'refreshedAt', 'expiresAt', 'timeToSync'].includes(key)) {
    await refreshToken()
    alert('Token refreshed!')
  }
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function variableToTitle(variable: string) {
  const res = variable.replace(/([A-Z])/g, ' $1')
  return res.charAt(0).toUpperCase() + res.slice(1)
}

async function refreshToken() {
  const auth = useAuthentication()
  await auth.refresh()
}
</script>

