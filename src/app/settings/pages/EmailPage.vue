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
            Enter your email address to sign in. We'll send you a 6-digit code to verify your email address.
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
            helper-text="Enter your email address to sign in"
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
            helper-text="6-digit code sent to your email"
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
          Send Email
        </ion-button>

        <ion-button
          v-if="state >= LoginState.Code"
          expand="block"
          :disabled="!code"
          @click="onSignIn"
        >
          Sign In
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonList, IonItem, IonToolbar, IonButtons, IonButton, IonTitle, IonInput, IonPage, IonBackButton, IonFooter, useIonRouter } from '@ionic/vue'
import { ref } from 'vue'
import { useAuthentication, useEmitter } from '@/app/shared'

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
const emitter = useEmitter()

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
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

/** Send email to get a validation code. */
async function onSendValidationCode() {
  await auth.authenticate('email', {
    email: email.value,
  })
  state.value = LoginState.Code
}

/** User has recieved email with code and entered it. */
async function onSignIn() {
  await auth.authenticate('email', {
    email: email.value,
    code: code.value,
  })
  emitter.emit('signedIn')
  state.value = LoginState.SignedIn
  navigateNext(props.nextUrl, props.navigationType)
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