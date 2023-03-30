<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />

      <!-- Tabs -->
      <ion-tab-bar
        slot="bottom"
        data-testid="tabs-bar"
      >
        <ion-tab-button
          tab="tab1"
          href="/home/library"
          data-testid="library-tab"
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
            v-if="cardsInInbox"
            data-testid="inbox-tab-badge"
          >
            {{ cardsInInbox }}
          </ion-badge>
        </ion-tab-button>

        <ion-tab-button
          tab="tab3"
          href="/home/review"
          data-testid="review-tab"
        >
          <ion-icon :icon="albumsOutline" />
          <ion-label>{{ $t('decks.review.title') }}</ion-label>
          <ion-badge
            v-if="cardsInReview"
            data-testid="review-tab-badge"
          >
            {{ cardsInReview }}
          </ion-badge>
        </ion-tab-button>

        <ion-tab-button
          tab="tab4"
          href="/home/settings"
          data-testid="settings-tab"
        >
          <ion-icon :icon="constructOutline" />
          <ion-label>{{ $t('settings.title') }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>

    <TutorialPlayer
      v-if="tutorialEnabled"
    />
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
import { useStatisticsStore } from '@/app/statistics'
import { TutorialPlayer, useTutorialStore } from '@/app/tutorial'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const statisticsStore = useStatisticsStore()
const tutorialStore = useTutorialStore()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { cardsInInbox, cardsInReview } = storeToRefs(statisticsStore)
const { enabled: tutorialEnabled } = storeToRefs(tutorialStore)
</script>


