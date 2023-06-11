<template>
  <ion-page ref="page">
    <!-- Header -->
    <ion-header
      @click="onHeaderClicked"
    >
      <ion-toolbar>
        <ion-title>{{ $t('settings.title') }}</ion-title>

        <ion-buttons slot="primary">
          <BackgroundTasks />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content>
      <ion-list>
        <ion-item
          v-if="settings.showAccountControls"
          :detail="true"
          router-link="/home/settings/account"
          router-direction="forward"
          data-testid="account"
        >
          <ion-label>{{ $t('settings.account') }}</ion-label>
        </ion-item>

        <ion-item>
          <ion-select
            v-model="settings.language"
            interface="action-sheet"
            placeholder="Language"
            data-testid="language"
            :label="$t('settings.language')"
            @ion-change="x => onLocaleChanged(x.detail.value)"
          >
            <ion-select-option
              v-for="lang in languages"
              :key="lang.code"
              :value="lang.code"
            >
              {{ lang.name }}
            </ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-toggle
            v-model="settings.showGradeButtons"
          >
            {{ $t('settings.gradeButtons') }}
          </ion-toggle>
        </ion-item>

        <ion-item>
          <ion-toggle
            v-model="settings.colorfulCards"
          >
            {{ $t('settings.colorfulCards') }}
          </ion-toggle>
        </ion-item>

        <ion-item>
          <ion-toggle
            v-model="settings.reviewCardsInRandomOrder"
          >
            {{ $t('settings.reviewCardsInRandomOrder') }}
          </ion-toggle>
        </ion-item>

        <ion-item
          v-if="isDevModeEnabled"
        >
          <ion-toggle
            v-model="settings.showUnpublishedVerses"
          >
            {{ $t('settings.showUnpublishedVerses') }}
          </ion-toggle>
        </ion-item>

        <ion-item>
          <ion-label
            @click="onSendEmail"
          >
            {{ $t('settings.contactUs') }}
          </ion-label>
        </ion-item>

        <ion-item
          router-link="/home/settings/cache"
          router-direction="forward"
          :detail="true"
        >
          <ion-label>{{ $t('settings.cache') }}</ion-label>
        </ion-item>

        <ion-item
          v-if="isDevModeEnabled"
          :detail="true"
          router-link="/home/settings/app"
          router-direction="forward"
        >
          <ion-label>{{ $t('app.name') }}</ion-label>
        </ion-item>

        <ion-item
          v-if="isDevModeEnabled"
          @click="onNextDay"
        >
          <ion-label>Next day</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonContent, IonHeader, IonItem, IonLabel, IonList,
  IonPage, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar,
  IonButtons
} from '@ionic/vue'
import { computed, inject, ref } from 'vue'
import { EmailComposer } from '@awesome-cordova-plugins/email-composer'
import { useSettingsStore } from '@/app/settings'
import { BackgroundTasks, getAvailableLanguages, useApplication } from '@/app/shared'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const i18n = inject('i18n') as any
const settings = useSettingsStore()
const app = useApplication()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const languages = getAvailableLanguages()
const isDevModeEnabled = computed(() => devModeClicks.value >= 3)
const devModeClicks = ref(0)
const daysInFuture = ref(0)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onLocaleChanged(lang: string) {
  i18n.locale.value = lang
}

async function onSendEmail() {
  await EmailComposer.open({
    to: ['feedback@shlokas.app']
  })
}

function onHeaderClicked() {
  devModeClicks.value += 1
}

function onNextDay() {
  daysInFuture.value += 1
  app.goInFuture(daysInFuture.value)
}
</script>
