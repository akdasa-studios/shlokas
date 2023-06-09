<template>
  <ion-page ref="page">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('library.title') }}</ion-title>
        <ion-buttons slot="primary">
          <BackgroundTasks />
        </ion-buttons>
      </ion-toolbar>

      <ion-toolbar>
        <ion-searchbar
          v-model="searchQuery"
          :placeholder="$t('library.search')"
          animated
        />
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-refresher
        slot="fixed"
        @ion-refresh="onRefresherPullDown"
      >
        <ion-refresher-content />
      </ion-refresher>

      <VersesList
        :verses="filteredVerses"
        :verse-statuses="verseStatuses"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { Language, Verse, VerseStatus } from '@akdasa-studios/shlokas-core'
import {
  IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent,
  IonSearchbar, IonTitle, IonToolbar, onIonViewWillEnter, IonButtons
} from '@ionic/vue'
import { inject, ref, shallowRef, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { IonRefresherCustomEvent, RefresherEventDetail } from '@ionic/core'
import { useLoadLibraryIntoMemory, useSyncLibraryTask, VersesList } from '@/app/library'
import { useSettingsStore } from '@/app/settings'
import { useApplication, BackgroundTasks } from '@/app/shared'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const application = useApplication()
const libraryDatabase = inject('verses')
const syncLibraryTask = useSyncLibraryTask(libraryDatabase)
const loadLibrary = useLoadLibraryIntoMemory(application.instance(), libraryDatabase)
const settings = useSettingsStore()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const searchQuery = ref('')
const filteredVerses = shallowRef<Verse[]>([])
const verseStatuses = shallowRef<{ [verseId: string]: VerseStatus}>({})
const { language, syncAt, syncLibraryAt } = storeToRefs(settings)

/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onIonViewWillEnter(onOpened)

/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

watch(searchQuery, async (v) => await onSearchQueryChanged(v))
watch(application.currentContextName, async () => await onSearchQueryChanged(''))
watch(syncAt, onOpened) // synced, update verse statuses


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onOpened() {
  await syncLibrary()
  await onSearchQueryChanged(searchQuery.value)
}

async function onSearchQueryChanged(value: string) {
  const app = application.instance()

  // NOTE: assign filteredVerses AFTER verseStatuses are fetched
  const languageCode = language.value
  const verses = await app.library.findByContent(new Language(languageCode, languageCode), value)
  verseStatuses.value = await app.library.getStatuses(verses.map(x => x.id))
  filteredVerses.value = Array.from(verses).sort((a, b) => compareVerseNumber(a.number.value, b.number.value))
}

async function onRefresherPullDown(
  event: IonRefresherCustomEvent<RefresherEventDetail>
) {
  await syncLibrary(true)
  await onSearchQueryChanged(searchQuery.value)
  event.target.complete()
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function compareVerseNumber(a: string, b: string): number {
  const tokens1 = a.split(/\.| /)
  const tokens2 = b.split(/\.| /)
  for (const [idx] of tokens1.entries()) {
    if (idx == 0) {
      if (tokens1[idx] > tokens2[idx]) { return 1 }
      if (tokens1[idx] < tokens2[idx]) { return -1 }
    } else {
      const c = parseInt(tokens1[idx]) - parseInt(tokens2[idx])
      if (c != 0) return c
    }
  }
  return 0
}

async function syncLibrary(force = false) {
  const now = new Date().getTime()
  const week = 604800000 // 1000 * 60 * 60 * 24 * 7
  const syncedMoreThanAWeekAgo = (now - syncLibraryAt.value) > week
  const notSyncedAtAll = syncLibraryAt.value === 0

  if (syncedMoreThanAWeekAgo || notSyncedAtAll || force) {
    await syncLibraryTask.sync({ showProgress: !force })
    if (!syncLibraryTask.isFailed) {
      await loadLibrary.sync()
      settings.syncLibraryAt = now
    }
  }
}
</script>
