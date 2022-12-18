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
        @swiped="onCardSwiped"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { InboxCard } from '@/app/inbox/views'
import { inbox } from '@/application'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

function onCardSwiped(direction: string) {
  setTimeout(() => {
    const first = inbox.cards.value.shift()
    if (!first) { return }
    // first.progress = ""
    if (direction == "left" || direction == "right") {
      inbox.cards.value.push(first)
    } else if (direction == "top" || direction == "bottom") {
      // inboxStore.mark(first.id)
      // const verseId = first.verse.number || ""
      // const allReviewd = inboxStore.isAllReviewdByVerse(verseId)
      // if (first.type == InboxTypeCard.text) {
      //   reviewStore.addCard(verseId, "text:number")
      //   reviewStore.addCard(verseId, "number:text")
      // } else if (first.type == InboxTypeCard.transaltion) {
      //   reviewStore.addCard(verseId, "translation:number")
      //   reviewStore.addCard(verseId, "number:translation")
      // }
      // if (allReviewd) {
      //   reviewStore.addCard(verseId, "translation:text")
      //   reviewStore.addCard(verseId, "text:translation")
      // }
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