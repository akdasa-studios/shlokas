<template>
  <ion-list>
    <VersesListItem
      v-for="verse in props.verses"
      :key="verse.number.toString()"
      :verse="verse"
      :verse-status="getStatus(verse.id.value)"
    />
  </ion-list>
</template>


<script lang="ts" setup>
import { Verse, VerseStatus } from '@akdasa-studios/shlokas-core'
import { IonList } from '@ionic/vue'
import { defineProps } from 'vue'
import { VersesListItem } from '@/app/library'


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

export type VerseStatusMap = { [verseId: string]: VerseStatus }

const props = defineProps<{
  verses: Verse[],
  verseStatuses: VerseStatusMap
}>()


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function getStatus(verseId: string) {
  return props.verseStatuses[verseId]
}
</script>
