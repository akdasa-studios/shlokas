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
      <FlipCard
        v-for="card, idx in inbox.cards.value"
        :key="card.id.value"
        :index="idx"
        :swipe-threshold="50"
        :swipe-directions="swipeDirections"
        @swiped="onTopCardSwiped"
        @swiping="onTopCardSwiping"
      >
        <template #overlay>
          <InboxCardProgressSide :state="card.progress" />
        </template>

        <template #front>
          <div
            v-if="card.type === 'Text'"
            class="front"
          >
            <div class="number">
              {{ card.verseNumber }}
            </div>
            <VerseLines :lines="card.text" />
          </div>

          <div
            v-if="card.type === 'Translation'"
            class="front"
          >
            <div class="number">
              {{ card.verseNumber }}
            </div>
            <div>{{ card.translation }}</div>
          </div>
        </template>

        <template #back>
          <div class="front">
            <SynonymsSide :words="card.synonims" />
          </div>
        </template>
      </FlipCard>
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonTitle,
} from '@ionic/vue';
import { computed } from 'vue'
import FlipCard from '@/views/cards/FlipCard.vue'
import VerseLines from '@/views/cards/inbox/InboxCardVerseTextSide.vue'
import SynonymsSide from '@/views/cards/inbox/InboxCardSynonymsSide.vue'
import InboxCardProgressSide from '@/views/cards/inbox/InboxCardProgressSide.vue'
import { useI18n } from 'vue-i18n'
import { inbox } from '@/application'

const { t } = useI18n()

const swipeDirections = computed(() => {
  return inbox.cards.value.length > 1 ? ['top', 'bottom', 'left', 'right'] : ['top', 'bottom']
})

function onTopCardSwiping({ direction, value }) {
  const first = inbox.cards.value[0]
  const progress =
    (direction === "top"  || direction === "bottom") && value !== 0 ? "finished" :
    (direction === "left" || direction === "right")  && value !== 0 ? "inProgress" : ""
  first.setProgress(progress)
}
function onTopCardSwiped({ direction }) {
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

<style scoped>
.front {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 6vw;
  text-align: center;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  border-bottom: 10px solid #ddd;
}
.number {
  text-transform: uppercase;
  background-color: lightblue;
  padding: .4em;
  margin: .4em;
  border-radius: .2em;
  font-size: 6vw;
}
</style>

<i18n locale="en" lang="yaml">
inbox: Inbox
</i18n>


<i18n locale="ru" lang="yaml">
inbox: Входящие
</i18n>