<template>
  <ion-page ref="page">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('library.title') }}</ion-title>
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

    <ion-loading
      :is-open="syncLibraryTask.inProgress.value"
      message="Loading verses..."
      duration="3500"
    />
  </ion-page>
</template>


<script lang="ts" setup>
import { Application, Language, Verse, VerseStatus } from '@akdasa-studios/shlokas-core'
import {
  IonContent, IonHeader, IonPage, IonLoading, IonRefresher, IonRefresherContent,
  IonSearchbar, IonTitle, IonToolbar, onIonViewWillEnter, onIonViewWillLeave
} from '@ionic/vue'
import { inject, ref, shallowRef, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { IonRefresherCustomEvent, RefresherEventDetail } from '@ionic/core'
import { useLoadLibraryIntoMemory, useSyncLibraryTask, VersesList } from '@/app/library'
import { useSettingsStore } from '@/app/settings'
import { TutorialSteps, useTutorialStore } from '@/app/tutorial'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const app = inject('app') as Application
const libraryDatabase = inject('verses')
const syncLibraryTask = useSyncLibraryTask(libraryDatabase)
const loadLibrary = useLoadLibraryIntoMemory(app, libraryDatabase)
const settings = useSettingsStore()
const tutorial = useTutorialStore()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const searchQuery = ref('')
const filteredVerses = shallowRef<Verse[]>([])
const verseStatuses = shallowRef<{ [verseId: string]: VerseStatus}>({})
const { localeSettings } = storeToRefs(settings)


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onIonViewWillEnter(onOpened)


/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

watch(searchQuery, async (v) => await onSearchQueryChanged(v))


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onOpened() {
  await syncLibrary()
  await onSearchQueryChanged(searchQuery.value)
}

async function onSearchQueryChanged(value: string) {
  // NOTE: assign filteredVerses AFTER verseStatuses are fetched
  const languageCode = localeSettings.value.language
  const verses = await app.library.findByContent(new Language(languageCode, languageCode), value)
  verseStatuses.value = await app.library.getStatuses(verses.map(x => x.id))
  filteredVerses.value = Array.from(verses).sort((a, b) => compareVerseNumber(a.number.value, b.number.value))

  completeTutorialStep(TutorialSteps.LibrarySearch)
}

async function onRefresherPullDown(
  event: IonRefresherCustomEvent<RefresherEventDetail>
) {
  await syncLibrary(true)
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
  const syncedMoreThanAWeekAgo = (now - (settings.library.lastSyncDate || 0)) > week
  if (syncedMoreThanAWeekAgo || force) {
    await syncLibraryTask.sync({ showProgress: !force })
    await loadLibrary.sync()
    settings.library.lastSyncDate = now
  }
}

/* -------------------------------------------------------------------------- */
/*                                  Tutorial                                  */
/* -------------------------------------------------------------------------- */

function completeTutorialStep(step: TutorialSteps) {
  tutorial.completeStep(step)
}
</script>
