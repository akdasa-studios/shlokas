<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title>{{ $t('account.signUp') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <!-- Name -->
        <ion-item>
          <ion-input
            v-model="name"
            :label="$t('account.name')"
            label-placement="stacked"
          />
        </ion-item>

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
          @click="onSignUp"
        >
          {{ $t('account.signUp') }}
        </ion-button>
      </div>

      <ion-loading
        :is-open="inProgress"
        :duration="3000"
        :message="$t('common.wait')"
        @did-dismiss="inProgress = false"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,
  IonList, IonItem, IonInput, IonButton, IonPage,
  IonLoading, IonBackButton, useIonRouter
} from '@ionic/vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { AuthService } from '@/services/AuthService'
import { useAccountStore } from '@/app/settings'
import { useEnv } from '@/app/shared'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const env = useEnv()
const account = useAccountStore()
const router = useIonRouter()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { name, email, password } = storeToRefs(account)
const inProgress = ref(false)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onSignUp() {
  inProgress.value = true
  await new AuthService(env.getAuthUrl()).signUp(
    name.value, email.value, password.value,
  )
  router.back()
  inProgress.value = false
}
</script>
