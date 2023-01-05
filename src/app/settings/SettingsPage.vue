<template>
  <ion-page>
    <ion-router-outlet />
  </ion-page>
  <!-- <ion-nav :root="component" /> -->
</template>

<script lang="ts" setup>
import { IonNav, IonRouterOutlet, IonPage } from '@ionic/vue'
import MainSettingsPage from './MainSettingsPage.vue'
// const component = MainSettingsPage
</script>