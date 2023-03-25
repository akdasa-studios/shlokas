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
import { Application, Verse, VerseStatus } from '@akdasa-studios/shlokas-core'
import {
  IonContent, IonHeader, IonPage, IonLoading,
  IonSearchbar, IonTitle, IonToolbar, onIonViewWillEnter
} from '@ionic/vue'
import { inject, ref, shallowRef, toRaw, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useLoadLibraryIntoMemory, useSyncLibraryTask, VersesList } from '@/app/library'
import { useLocaleStore } from '@/app/settings'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const app = inject('app') as Application
const libraryDatabase = inject('verses')
const syncLibraryTask = useSyncLibraryTask(libraryDatabase)
const loadLibrary = useLoadLibraryIntoMemory(app, libraryDatabase)
const locale = useLocaleStore()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const searchQuery = ref('')
const filteredVerses = shallowRef<Verse[]>([])
const verseStatuses = shallowRef<{ [verseId: string]: VerseStatus}>({})
const { language } = storeToRefs(locale)

let isLibrarySynced = false


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
  if (!isLibrarySynced) {
    await syncLibraryTask.sync()
    await loadLibrary.sync()
    isLibrarySynced = true
  }
  await onSearchQueryChanged(searchQuery.value)
}

async function onSearchQueryChanged(value: string) {
  // NOTE: assign filteredVerses AFTER verseStatuses are fetched
  const verses = await app.library.findByContent(toRaw(language.value), value)
  verseStatuses.value = await app.library.getStatuses(verses.map(x => x.id))
  filteredVerses.value = Array.from(verses).sort((a, b) => compare(a.number.value, b.number.value))
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function compare(a: string, b: string): number {
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
</script>
