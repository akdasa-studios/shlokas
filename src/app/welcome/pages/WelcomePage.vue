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

      <div :class="{'invisible': !isLoading}">
        {{ $t("welcome.loadingData") }}
      </div>
    </div>

    <div class="box">
      <IonButton
        expand="block"
        color="dark"
        @click="onAppleSignIn"
      >
        <ion-icon
          slot="start"
          :icon="logoApple"
        />
        {{ $t("welcome.login.withAppleId") }}
      </IonButton>
      <IonButton
        expand="block"
        @click="onEmailSignIn"
      >
        <ion-icon
          slot="start"
          :icon="mail"
        />
        {{ $t("welcome.login.withEmail") }}
      </IonButton>
      <IonButton
        router-link="/home/library"
        router-direction="root"
        expand="block"
        fill="outline"
      >
        {{ $t("welcome.login.asGuest") }}
      </IonButton>
    </div>
  </ion-page>
</template>


<script lang="ts" setup>
import { IonPage, IonButton, IonIcon, useIonRouter, alertController } from '@ionic/vue'
import { usePreferredDark } from '@vueuse/core'
import { inject, onMounted , computed } from 'vue'
import { logoApple, mail } from 'ionicons/icons'
import { useLoadLibraryIntoMemory, useSyncLibraryTask } from '@/app/library'
import { useSettingsStore } from '@/app/settings'
import { DarkImage, go, useSyncTask, useAuthentication, useApplication } from '@/app/shared'
import { AppleAuthenticationStrategy } from '@/services/auth/strategies'


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const application = useApplication()
const isDark = usePreferredDark()
const libraryDatabase = inject('verses')
const syncLibraryTask = useSyncLibraryTask(libraryDatabase)
const settingsStore = useSettingsStore()
const loadLibrary = useLoadLibraryIntoMemory(application.instance(), libraryDatabase)
const router = useIonRouter()
const appleAuth = useAuthentication(new AppleAuthenticationStrategy())
const syncTask = useSyncTask()


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onMounted(onOpened)


/* -------------------------------------------------------------------------- */
/*                                   States                                   */
/* -------------------------------------------------------------------------- */

const isLoading = computed(() => syncLibraryTask.inProgress.value || loadLibrary.inProgress.value || syncTask.inProgress.value)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onOpened() {
  await syncLibraryTask.sync()
  await loadLibrary.sync()
  settingsStore.library.lastSyncDate = new Date().getTime()
  settingsStore.welcome.done = true
}

async function onAppleSignIn() {
  try {
    await appleAuth.authenticate()
    await appleAuth.refresh()
  } catch (e) {
    const alert = await alertController.create({
      header: 'Error',
      subHeader: 'Unable to sign in with Apple.',
      message: ((e as Error).message),
      buttons: ['OK'],
    })
    await alert.present()
    return
  }

  syncTask.run()
  router.replace(go('library'))
}

async function onEmailSignIn() {
  router.push(go('welcome-email'))
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