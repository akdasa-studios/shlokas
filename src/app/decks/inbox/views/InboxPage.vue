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
      color="light"
    >
      <InboxCard
        v-for="card, idx in inbox.cards.value"
        :key="card.id.value"
        :index="idx"
        :card="card"
        :swipe-directions="swipeDirections"
        @swiped="onCardSwiped"
      />

      <!-- Inbox deck is empty -->
      <InboxEmpty
        v-if="inbox.count.value === 0"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { InboxCard, InboxEmpty } from '@/app/decks/inbox/views'
import { inbox } from '@/application'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()
const swipeDirections = computed(() => {
  return inbox.cards.value.length > 1
    ? ['top', 'bottom', 'left', 'right']
    : ['top', 'bottom']
})

function onCardSwiped(direction: string) {
  setTimeout(() => {
    const first = inbox.cards.value.shift()
    if (!first) { return }
    // first.progress = ""
    if (direction == "left" || direction == "right") {
      inbox.cards.value.push(first)
    } else if (direction == "top" || direction == "bottom") {
      // pass
    }
  }, 250)
}
</script>



<i18n locale="en" lang="yaml">
inbox: Inbox
</i18n>


<i18n locale="ru" lang="yaml">
inbox: Входящие
</i18n>