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
  </ion-page>
</template>


<script lang="ts" setup>
import { Application, Verse, VerseStatus } from '@akdasa-studios/shlokas-core'
import {
  IonContent, IonHeader, IonPage,
  IonSearchbar, IonTitle, IonToolbar, onIonViewWillEnter
} from '@ionic/vue'
import { inject, ref, shallowRef, toRaw, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { VersesList } from '@/app/library'
import { useLocaleStore } from '@/app/settings'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const app = inject('app') as Application
const locale = useLocaleStore()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const searchQuery = ref('')
const filteredVerses = shallowRef<Verse[]>([])
const verseStatuses = shallowRef<{ [verseId: string]: VerseStatus}>({})
const { language } = storeToRefs(locale)


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onIonViewWillEnter(async () => await onSearchQueryChanged(searchQuery.value))

/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

watch(searchQuery, async (v) => await onSearchQueryChanged(v), { immediate: true })


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onSearchQueryChanged(value: string) {
  // NOTE: assign filteredVerses AFTER verseStatuses are fetched
  const verses = await app.library.findByContent(toRaw(language.value), value)
  verseStatuses.value = await app.library.getStatuses(verses.map(x => x.id))
  filteredVerses.value = Array.from(verses)
}
</script>
