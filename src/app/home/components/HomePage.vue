<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <!-- Tabs -->
      <ion-tab-bar slot="bottom">
        <ion-tab-button
          tab="tab1"
          href="/home/library"
        >
          <ion-icon :icon="libraryOutline" />
          <ion-label>{{ $t('library.title') }}</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="tab2"
          href="/home/inbox"
          data-testid="inbox-tab"
        >
          <ion-icon :icon="enterOutline" />
          <ion-label>{{ $t('decks.inbox.title') }}</ion-label>
          <ion-badge
            v-if="inboxDeckCount"
            data-testid="inboxCounterBadge"
          >
            {{ inboxDeckCount }}
          </ion-badge>
        </ion-tab-button>

        <ion-tab-button
          tab="tab3"
          href="/home/review"
        >
          <ion-icon :icon="albumsOutline" />
          <ion-label>{{ $t('decks.review.title') }}</ion-label>
          <ion-badge
            v-if="reviewDeckCount"
            data-testid="reviewCounterBadge"
          >
            {{ reviewDeckCount }}
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
import { storeToRefs } from 'pinia'
import { Application } from '@akdasa-studios/shlokas-core'
import { inject } from 'vue'
import { useInboxDeckStore } from '@/app/decks/inbox'
import { useReviewDeckStore } from '@/app/decks/review'

const app = inject('app') as Application
const { count: inboxDeckCount } = storeToRefs(useInboxDeckStore(app))
const { count: reviewDeckCount } = storeToRefs(useReviewDeckStore(app))
</script>
