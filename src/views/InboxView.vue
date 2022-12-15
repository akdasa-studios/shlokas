<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ t('inbox') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content
      :scroll-y="false"
      :scroll-x="false"
    >
      <div
        v-for="card in inbox.cards.value"
        :key="card.id.value"
        @click="card.memorized()"
      >
        {{ card.verseNumber }}
        {{ card.type }}
      </div>
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonTitle,
} from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { inbox } from '@/application'

const { t } = useI18n()
</script>

<style scoped>
</style>


<i18n locale="en" lang="yaml">
inbox: Inbox
</i18n>


<i18n locale="ru" lang="yaml">
inbox: Входящие
</i18n>