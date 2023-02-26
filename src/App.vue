<template>
  <ion-app>
    <ion-router-outlet />

    <!-- Global audio player -->
    <AudioPlayer />
  </ion-app>
</template>

<script lang="ts" setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { AudioPlayer } from '@/app/shared'

// Notch!
try {
  if (window.location.search.includes('demo')) {
    var css = `:root {
      --ion-safe-area-top: 20px;
      --ion-safe-area-bottom: 22px;
    }`
    var head = document.head || document.getElementsByTagName('head')[0]
    var style = document.createElement('style')
    head.appendChild(style)
    style.appendChild(document.createTextNode(css))
  }
} catch(e) { console.log(e) }
</script>