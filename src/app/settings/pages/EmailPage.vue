<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          {{ $t("welcome.login.withEmail") }}
        </ion-title>
        <ion-buttons slot="secondary">
          <ion-back-button />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list
        :inset="true"
        lines="none"
      >
        <ion-item>
          <p>
            {{ $t("welcome.login.withEmailInstructions") }}
          </p>
        </ion-item>

        <ion-item>
          <ion-input
            v-model="email"
            label="Email"
            placeholder="student@shlokas.app"
            label-placement="stacked"
            type="email"
            inputmode="email"
            :helper-text="$t('welcome.login.enterEmail')"
            autocomplete="email"
            :disabled="state >= LoginState.Code"
          />
        </ion-item>

        <ion-item
          v-if="state >= LoginState.Code"
        >
          <ion-input
            v-model="code"
            label="Code"
            placeholder="123456"
            label-placement="stacked"
            type="number"
            :helper-text="$t('welcome.login.sixDigitsCode')"
          />
        </ion-item>
      </ion-list>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-button
          v-if="state === LoginState.Email"
          expand="block"
          :disabled="!email"
          @click="onSendValidationCode"
        >
          {{ $t('common.next') }}
        </ion-button>

        <ion-button
          v-if="state >= LoginState.Code"
          expand="block"
          :disabled="!code"
          @click="onSignIn"
        >
          {{ $t('account.logIn') }}
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonList, IonItem, IonToolbar, IonButtons, IonButton, IonTitle, IonInput, IonPage, IonBackButton, IonFooter, useIonRouter, alertController } from '@ionic/vue'
import { ref, watch } from 'vue'
import { useAuthentication } from '@/app/shared'


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  nextUrl?: string,
  navigationType?: string,
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const auth = useAuthentication()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

enum LoginState {
  Email,     // The user has entered their email address and is waiting for a code.
  Code,      // User has received a code and is waiting for them to enter it.
  SignedIn,  // Code has verified and the user is signed in.
}

const state = ref<LoginState>(LoginState.Email)
const email = ref('')
const code = ref('')

/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

watch(email, onEmalChanged)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

/** Send email to get a validation code. */
async function onSendValidationCode() {
  try {
    await auth.authenticate('email', {
      email: email.value,
    })
    state.value = LoginState.Code
  } catch (e) {
    const alert = await alertController.create({
      header: 'Error',
      subHeader: 'Unable to sign in with Email.',
      message: 'Check your internet connection and try again',
      buttons: ['OK'],
    })
    await alert.present()
    state.value = LoginState.Email
  }
}

/** User has recieved email with code and entered it. */
async function onSignIn() {
  try {
    await auth.authenticate('email', {
      email: email.value,
      code: code.value,
    })
    state.value = LoginState.SignedIn
    navigateNext(props.nextUrl, props.navigationType)
  } catch (e) {
    const alert = await alertController.create({
      header: 'Error',
      subHeader: 'Unable to sign in with Email.',
      message: 'Code is invalid',
      buttons: ['OK'],
    })
    await alert.present()
    state.value = LoginState.Email
    code.value = ''
  }
}

function onEmalChanged(value: string) {
  if (value === 'test@shlokas.app') {
    code.value = '123456'
    state.value = LoginState.Code
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

/**
 * Navigate to the next page
 * @param nextUrl The url to navigate to. If undefined, go back.
 * @param navigationType The type of navigation to use. If undefined, use push.
 */
function navigateNext(
  nextUrl: string | undefined,
  navigationType: string | undefined
) {
  if (nextUrl) {
    if (navigationType === 'replace') {
      router.replace(nextUrl)
    } else {
      router.push(nextUrl)
    }
  } else {
    router.back()
  }
}
</script>