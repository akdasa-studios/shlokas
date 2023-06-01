<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts" setup>
import { IonApp, IonRouterOutlet, useIonRouter } from '@ionic/vue'
import { useSettingsStore } from '@/app/settings'

const router = useIonRouter()
const settingsStore = useSettingsStore()

// Notch!
try {
  if (window.location.host === 'shlokas-staging.netlify.app') {
    const css = `:root {
      --ion-safe-area-top: 20px;
      --ion-safe-area-bottom: 22px;
    }`
    const head = document.head || document.getElementsByTagName('head')[0]
    const style = document.createElement('style')
    head.appendChild(style)
    style.appendChild(document.createTextNode(css))
    settingsStore.showAccountControls = false
    router.replace('/home/library')
  }
} catch(e) { console.log(e) }
</script>