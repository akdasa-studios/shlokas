<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <!-- Tabs -->
      <ion-tab-bar slot="bottom">
        <ion-tab-button
          tab="tab1"
          href="/home/library"
          @click="shlokas.library.sync()"
        >
          <ion-icon :icon="libraryOutline" />
          <ion-label>{{ $t('library.title') }}</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="tab2"
          href="/home/inbox"
          data-testid="inbox-tab"
          @click="shlokas.inboxDeck.sync()"
        >
          <ion-icon :icon="enterOutline" />
          <ion-label>{{ $t('decks.inbox.title') }}</ion-label>
          <ion-badge
            v-if="shlokas.inboxDeck.count.value"
            data-testid="inboxCounterBadge"
          >
            {{ shlokas.inboxDeck.count.value }}
          </ion-badge>
        </ion-tab-button>

        <ion-tab-button
          tab="tab3"
          href="/home/review"
          @click="shlokas.reviewDeck.sync()"
        >
          <ion-icon :icon="albumsOutline" />
          <ion-label>{{ $t('decks.review.title') }}</ion-label>
          <ion-badge
            v-if="shlokas.reviewDeck.count.value"
            data-testid="reviewCounterBadge"
          >
            {{ shlokas.reviewDeck.count.value }}
          </ion-badge>
        </ion-tab-button>

        <ion-tab-button
          tab="tab4"
          href="/home/settings"
        >
          <ion-icon :icon="constructOutline" />
          <ion-label>{{ $t('settings.title') }}</ion-label>
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
  enterOutline, libraryOutline, albumsOutline,
  constructOutline
} from 'ionicons/icons'

import { shlokas } from '@/application'
</script>
