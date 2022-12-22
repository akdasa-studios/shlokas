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
          <ion-label>{{ t('library.title') }}</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="tab2"
          href="/home/inbox"
          data-testid="inbox-tab"
          @click="root.inbox.sync()"
        >
          <ion-icon :icon="enterOutline" />
          <ion-label>{{ t('decks.inbox.title') }}</ion-label>
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
          <ion-label>{{ t('decks.review.title') }}</ion-label>
          <ion-badge
            v-if="root.review.count.value"
            data-testid="reviewCounterBadge"
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
