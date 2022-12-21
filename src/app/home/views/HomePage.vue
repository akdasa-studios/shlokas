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
          @click="root.inbox.sync()"
        >
          <ion-icon :icon="enterOutline" />
          <ion-label>{{ t('inbox') }}</ion-label>
          <ion-badge
            v-if="root.inbox.count.value"
            data-testid="inboxCounterBadge"
          >
            {{ root.inbox.count.value }}
          </ion-badge>
        </ion-tab-button>

        <ion-tab-button
          tab="tab3"
          href="/home/review"
        >
          <ion-icon :icon="albumsOutline" />
          <ion-label>{{ t('review') }}</ion-label>
          <ion-badge
            v-if="root.review.count.value"
          >
            {{ root.review.count.value }}
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
} from '@ionic/vue'
import {
  enterOutline, libraryOutline, albumsOutline
} from 'ionicons/icons'

import { useI18n } from 'vue-i18n'
import { root } from '@/application'
const { t } = useI18n()
</script>


<i18n locale="en" lang="yaml">
inbox: Inbox
library: Library
review: Review
settings: Settings
</i18n>

<i18n locale="ru" lang="yaml">
inbox: Входящие
library: Библиотека
review: Изучение
settings: Настройки
</i18n>
