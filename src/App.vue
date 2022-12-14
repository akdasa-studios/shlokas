<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';


console.log(window.location.hostname)
if (window.location.hostname === 'shlokas-staging.netlify.app') {
  console.log("loading custom.css")
  require('./theme/custom.css')
}

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>