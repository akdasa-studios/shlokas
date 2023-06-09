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
        v-if="platform === 'ios'"
        expand="block"
        color="dark"
        @click="onSignIn('apple')"
      >
        <ion-icon
          slot="start"
          :icon="logoApple"
        />
        {{ $t("welcome.login.withAppleId") }}
      </IonButton>
      <IonButton
        v-if="platform !== 'web'"
        expand="block"
        color="danger"
        @click="onSignIn('google')"
      >
        <ion-icon
          slot="start"
          :icon="logoGoogle"
        />
        {{ $t("welcome.login.withGoogle") }}
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
        router-direction="root"
        expand="block"
        fill="outline"
        @click="onSigInAsGuest"
      >
        <ion-icon
          slot="start"
          :icon="people"
        />
        {{ $t("welcome.login.asGuest") }}
      </IonButton>
    </div>
  </ion-page>
</template>


<script lang="ts" setup>
import { IonPage, IonButton, IonIcon, useIonRouter, alertController } from '@ionic/vue'
import { usePreferredDark } from '@vueuse/core'
import { inject, onMounted , computed } from 'vue'
import { logoApple, logoGoogle, mail, people } from 'ionicons/icons'
import { Capacitor } from '@capacitor/core'
import { useLoadLibraryIntoMemory, useSyncLibraryTask } from '@/app/library'
import { useSettingsStore } from '@/app/settings'
import { DarkImage, go, useAuthentication, useApplication, useEmitter } from '@/app/shared'


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const emitter = useEmitter()
const application = useApplication()
const isDark = usePreferredDark()
const libraryDatabase = inject('verses')
const syncLibraryTask = useSyncLibraryTask(libraryDatabase)
const settingsStore = useSettingsStore()
const loadLibrary = useLoadLibraryIntoMemory(application.instance(), libraryDatabase)
const router = useIonRouter()
const auth = useAuthentication()


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onMounted(onOpened)


/* -------------------------------------------------------------------------- */
/*                                   State                                    */
/* -------------------------------------------------------------------------- */

const isLoading = computed(() => syncLibraryTask.inProgress.value || loadLibrary.inProgress.value)
const platform = Capacitor.getPlatform()


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onOpened() {
  await syncLibraryTask.sync()
  await loadLibrary.sync()
  settingsStore.welcomeDone = true
}

async function onSignIn(strategy: string) {
  try {
    await auth.authenticate(strategy)
    emitter.emit('signedIn')
    router.replace(go('library'))
  } catch (e) {
    const alert = await alertController.create({
      header: 'Error',
      subHeader: `Unable to sign in with ${strategy}.`,
      message: ((e as Error).message),
      buttons: ['OK'],
    })
    await alert.present()
  }
}

async function onEmailSignIn() {
  router.push(go('welcome-email'))
}

function onSigInAsGuest() {
  router.replace(go('library'))
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