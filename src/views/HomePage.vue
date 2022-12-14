<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom">
        <ion-tab-button
          tab="tab1"
          href="/home/library"
        >
          <ion-icon :icon="libraryOutline" />
          <ion-label>{{ t('library') }}</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="tab2"
          href="/home/inbox"
        >
          <ion-icon :icon="enterOutline" />
          <ion-label>{{ t('inbox') }}</ion-label>
          <ion-badge
            v-if="app.counters.inboxCardsCount.value"
            data-testid="inboxCounterBadge"
          >
            {{ app.counters.inboxCardsCount.value }}
          </ion-badge>
        </ion-tab-button>

        <ion-tab-button
          tab="tab3"
          href="/home/review"
        >
          <ion-icon :icon="albumsOutline" />
          <ion-label>{{ t('review') }}</ion-label>
          <ion-badge v-if="false">
            0
          </ion-badge>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonTabBar, IonTabButton, IonTabs, IonLabel,
  IonIcon, IonPage, IonRouterOutlet, IonBadge
} from '@ionic/vue';
import { enterOutline, libraryOutline, albumsOutline } from 'ionicons/icons'
import { useI18n } from 'vue-i18n'
import { useApp } from '@/application'
const { t } = useI18n()
const app = useApp()
</script>


<i18n locale="en" lang="yaml">
inbox: Inbox
library: Library
review: Review
settings: Settings
</i18n>

<i18n locale="ru" lang="yaml">
inbox: Входящие
library: Library
review: Изучение
settings: Настройки
</i18n>