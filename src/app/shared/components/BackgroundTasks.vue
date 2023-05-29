<template>
  <ion-spinner
    v-if="visible"
  />
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { IonSpinner } from '@ionic/vue'
import { useLoadLibraryIntoMemory, useSyncLibraryTask } from '@/app/library'
import { useSync } from '../composables/useSync'
import { useApplication } from '../composables/useApp'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const application = useApplication()
const libraryDatabase = inject('verses')
const syncTask = useSync()
const syncLibraryTask = useSyncLibraryTask(libraryDatabase)
const loadLibrary = useLoadLibraryIntoMemory(application.instance(), libraryDatabase)


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const visible = computed(() =>
  syncTask.inProgress.value
  || syncLibraryTask.inProgress.value
  || loadLibrary.inProgress.value
)
</script>