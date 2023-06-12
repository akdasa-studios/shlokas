<template>
  <ion-page ref="page">
    <!-- Header -->
    <ion-header
      @click="onHeaderClicked"
    >
      <ion-toolbar>
        <ion-title>{{ $t('settings.title') }}</ion-title>

        <ion-buttons slot="primary">
          <ion-button
            @click="onSendEmail"
          >
            {{ $t("settings.contactUs") }}
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content>
      <ion-list>
        <ion-list-header>
          <ion-label>{{ $t('settings.general') }}</ion-label>
        </ion-list-header>

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

        <ion-list-header>
          <ion-label>{{ $t('settings.appearance') }}</ion-label>
        </ion-list-header>

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

        <ion-list-header>
          <ion-label>{{ $t('settings.system') }}</ion-label>
        </ion-list-header>

        <ion-item
          v-if="updateInfo.available"
        >
          <ion-label @click="onUpdate">
            {{ $t('settings.update') }}
            <p>
              from {{ updateInfo.channel }} to {{ updateInfo.nextVersion }}
            </p>
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
  IonButtons, IonListHeader, IonButton
} from '@ionic/vue'
import { computed, inject, onMounted, reactive, ref } from 'vue'
import { EmailComposer } from '@awesome-cordova-plugins/email-composer'
import { Deploy } from 'cordova-plugin-ionic'
import { useSettingsStore } from '@/app/settings'
import { getAvailableLanguages, useApplication } from '@/app/shared'

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
const updateInfo = reactive({
  available: false,
  nextVersion: 'xxxx',
  channel: 'channel'
})


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onMounted(checkUdates)

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

async function onUpdate() {
  await Deploy.sync({
    updateMethod: 'auto',
  })
}

async function checkUdates() {
  const updates = await Deploy.checkForUpdate()
  const config = await Deploy.getConfiguration()
  updateInfo.available = updates.available
  updateInfo.nextVersion = updates.build || '?'
  updateInfo.channel = config.channel
}
</script>
