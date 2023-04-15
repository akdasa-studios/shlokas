<template>
  <ion-page>

    <div class="container">
      <div class="box">
        <DarkImage
          src="brahma.svg"
          class="logo"
          :is-dark="isDark"
        />
      </div>

      <div class="box">
        {{ $t("welcome.greetings") }}
      </div>

      <div :class="{'invisible': !syncLibraryTask.inProgress.value}">
        {{ $t("welcome.loadingData") }}
      </div>
    </div>

    <div class="box">
      <IonButton router-link="/home/library" router-direction="root" expand="block">
        {{ $t("common.forward") }}
      </IonButton>
    </div>

  </ion-page>
</template>


<script lang="ts" setup>
import { IonPage, IonButton } from '@ionic/vue'
import { DarkImage, useApplication } from '@/app/shared'
import { usePreferredDark } from '@vueuse/core'
import { inject, onMounted } from 'vue';
import { useLoadLibraryIntoMemory, useSyncLibraryTask } from '@/app/library';
import { useSettingsStore } from '@/app/settings';

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const application = useApplication()
const isDark = usePreferredDark()
const libraryDatabase = inject('verses')
const syncLibraryTask = useSyncLibraryTask(libraryDatabase)
const settingsStore = useSettingsStore()
const loadLibrary = useLoadLibraryIntoMemory(application.instance(), libraryDatabase)


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onMounted(onOpened)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onOpened() {
  await syncLibraryTask.sync()
  await loadLibrary.sync()
  settingsStore.library.lastSyncDate = new Date().getTime()
  settingsStore.welcome.done = true
}
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  align-self: center;
  justify-content: center;
  place-items: center;
  text-align: center;
}

.logo {
  max-width: 190px;
  padding-top: 120px;
}

.box {
  padding: 22px;
  width: 100%;
}

.invisible {
  opacity: 0;
  transition: .5s;
}
</style>