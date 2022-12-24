<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { shlokas } from '@/application'

const { locale } = useI18n()


// Notch!
try {
  if (window.location.search.includes("demo")) {
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

//
try {
  window.onmessage = function(e) {
    if (e.data == 'nextDay') { shlokas.debug.nextDay() }
    if (e.data == 'lang:en') { locale.value = 'en' }
    if (e.data == 'lang:ru') { locale.value = 'ru' }
    if (e.data == 'lang:rs') { locale.value = 'rs' }
  }
} catch(e) { console.log(e) }

</script>