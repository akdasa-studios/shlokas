<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ t('review') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content
      :scroll-y="false"
      :scroll-x="false"
      color="light"
    >
      Review
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonTitle,
} from '@ionic/vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
</style>


<i18n src="@/locale/common.yml" lang="yaml" />

<i18n locale="en" lang="yaml">
review: Review
</i18n>


<i18n locale="ru" lang="yaml">
review: Review
</i18n>