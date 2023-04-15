<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title>{{ $t('account.logIn') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list
        lines="full"
        class="ion-no-margin ion-no-padding"
      >
        <!-- email -->
        <ion-item>
          <ion-input
            v-model="email"
            type="email"
            :label="$t('account.email')"
            label-placement="stacked"
          />
        </ion-item>

        <!-- password -->
        <ion-item>
          <ion-input
            v-model="password"
            type="password"
            :label="$t('account.password')"
            label-placement="stacked"
          />
        </ion-item>
      </ion-list>

      <div class="ion-padding">
        <ion-button
          expand="block"
          @click="onLogIn"
        >
          {{ $t('account.logIn') }}
        </ion-button>
      </div>

      <ion-loading
        :is-open="inProgress"
        :duration="3000"
        :message="$t('common.wait')"
        @did-dismiss="inProgress = false"
      />

      <ion-alert
        :is-open="loginFailedDialogOpen"
        :header="$t('account.logInFailed.title')"
        :message="$t('account.loginFailed.message')"
        :buttons="[$t('common.ok')]"
        @did-dismiss="loginFailedDialogOpen=false"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonButton, IonContent, IonHeader, IonInput, IonItem,
  IonList, IonLoading, IonPage, IonTitle,
  IonToolbar, IonButtons, IonAlert, IonBackButton, useIonRouter
} from '@ionic/vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { AuthService } from '@/services/AuthService'
import { useEnv } from '@/app/shared'
import { useAccountStore } from '@/app/settings'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const env = useEnv()
const account = useAccountStore()
const router = useIonRouter()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { email, password, token } = storeToRefs(account)
const inProgress = ref(false)
const loginFailedDialogOpen = ref(false)


/* -------------------------------------------------------------------------- */
/*                                   Handles                                  */
/* -------------------------------------------------------------------------- */

async function onLogIn() {
  inProgress.value = true
  const result = await new AuthService(env.getAuthUrl()).logIn(
    email.value,
    password.value,
  )
  if (result.isSuccess) {
    token.value = result.value
    router.back()
  } else {
    loginFailedDialogOpen.value = true
  }
  inProgress.value = false
}
</script>
