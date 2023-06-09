<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('settings.title') }}</ion-title>
        <ion-buttons slot="secondary">
          <ion-back-button />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content>
      <ion-list>
        <ion-item
          @click="startDowloading"
        >
          <ion-label>
            Download: {{ filesCount }}
          </ion-label>
        </ion-item>

        <ion-item
          @click="clearAllCache"
        >
          <ion-label>{{ $t('settings.clearCache') }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonContent, IonHeader, IonItem, IonLabel, IonList,
  IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons
} from '@ionic/vue'
import { computed, onMounted, ref } from 'vue'
import { useApplication, useClearCache, useDownloader, useEnv } from '@/app/shared'


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */


const app = useApplication()
const env = useEnv()
const downloader = useDownloader()
const clearCache = useClearCache()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const files = ref<string[]>([])
const filesCount = computed(() => files.value.length)


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onMounted(getFilesToDownload)


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

async function getFilesToDownload() {
  const declamations = (await app.instance().repositories.declamations.all()).entities
  const verseImages  = (await app.instance().repositories.verseImages.all()).entities

  for (const declamation of declamations) {
    const isDownloaded = await downloader.isDownloaded(env.getContentUrl(declamation.url))
    if (!isDownloaded) {
      files.value.push(declamation.url)
    }
  }
  for (const verseImage of verseImages) {
    const isDownloaded = await downloader.isDownloaded(env.getContentUrl(verseImage.url))
    if (!isDownloaded) {
      files.value.push(verseImage.url)
    }
  }
}

async function startDowloading() {
  setTimeout(async () => {
    await downloadNextFile()
    startDowloading()
  }, 50)
}

async function downloadNextFile() {
  const file = files.value.pop()
  if (file) {
    await downloader.download(env.getContentUrl(file))
  }
}

function clearAllCache() {
  clearCache.cleanCache()
  alert('Done')
}
</script>
