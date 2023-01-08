<template>
  <ion-page ref="page">
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('library.title') }}</ion-title>
      </ion-toolbar>

      <ion-toolbar>
        <ion-searchbar
          v-model="query"
          data-testid="searchbar"
          :placeholder="$t('library.search')"
          animated
        />
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item
          v-for="verse in verses"
          :key="verse.number.toString()"
          :data-testid="testId(verse.number.value)"
          text-wrap
          role="listitem"
          @click="verseDialog.open(verse)"
        >
          <ion-label class="ion-text-wrap">
            <div class="header">
              <h2 class="inline">
                {{ verse.number.value }}
              </h2>
              <ion-badge
                v-if="verse.showStatus.value"
                class="badge"
                color="primary"
                :data-testid="testId(verse.number.value, 'badge')"
              >
                {{ verse.status.value }}
              </ion-badge>
            </div>
            <p>{{ verse.translation.value }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- Modal -->
      <ion-modal
        :is-open="verseDialog.isOpen.value"
        :presenting-element="presentingElement"
        role="dialog"
        @will-dismiss="(e) => onVerseDialogDismiss(e.detail.role)"
      >
        <VerseDialog :verse="verseDialog.data.value" />
      </ion-modal>

      <!-- Toast -->
      <ion-toast
        position="top"
        color="dark"
        :message="verseAddedToast.message.value"
        :is-open="verseAddedToast.isOpen.value"
        :buttons="[{ text: 'Revert', role: 'cancel', handler: onRevert }]"
        :duration="2000"
        @did-dismiss="verseAddedToast.close()"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { AddVerseToInboxDeck, Application, Language, UpdateVerseStatus } from '@akdasa-studios/shlokas-core'
import {
  IonBadge, IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal, IonPage,
  IonSearchbar, IonTitle, IonToast, IonToolbar
} from '@ionic/vue'
import { storeToRefs } from 'pinia'
import { inject, markRaw, onMounted, Ref, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Transaction } from '@akdasa-studios/framework'
import { testId } from '@/app/TestId'
import { VerseDialog, VerseViewModel } from '@/app/library'
import { useDialog, useToast } from '@/app/composables'
import { useLocaleStore } from '@/app/settings'
import { useInboxDeckStore } from '../decks/inbox'

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const app = inject('app') as Application

const i18n = useLocaleStore()
const inboxDeck = useInboxDeckStore(app)
const { language } = storeToRefs(i18n)

const { t } = useI18n()

const verseDialog = useDialog<VerseViewModel>(VerseViewModel.empty)
const verseAddedToast = useToast()
const page = ref(null)
const presentingElement = ref(null)
const query = ref("")
const verses: Ref<VerseViewModel[]> = ref([])
const { refresh: refreshInboxDeck } = inboxDeck

watch([language, query], onSearchQueryChanged, { immediate :true })

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

onMounted(() => {
  presentingElement.value = page.value.$el
})

async function onSearchQueryChanged() {
  verses.value = await findByContent(language.value, query.value)
}

async function onVerseDialogDismiss(action: string) {
  verseDialog.close()
  if (action === "confirm") {
    const verse = verseDialog.data.value
    const verseNumber = verse.number.value

    verseAddedToast.open(t('decks.inbox.verseAdded', { verseNumber }))

    const transaction = new Transaction()
    await app.processor.execute(new AddVerseToInboxDeck(verse.verseId.value), transaction)
    await app.processor.execute(new UpdateVerseStatus(verse.verseId.value), transaction)
    await verse.sync()
    await refreshInboxDeck()

  }
}

async function onRevert() {
  const verse = verseDialog.data.value
  await app.processor.revert()
  await verse.sync()
  await refreshInboxDeck()
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

async function findByContent(lang: Language, query: string) {
  console.log(app)
  const verses = await app.library.findByContent(lang, query)
  const statuses = await app.library.getStatuses(verses.map(x => x.id))

  return verses.map((verse) => {
    return markRaw(new VerseViewModel(verse, statuses[verse.id.value]))
  })
}
</script>


<style scoped>
.inline {
  display: inline;
}
.header {
  display: flex;
  align-items: center;
}
.badge {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
