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
          v-if="settings.appearance.accountControls"
          :detail="true"
          router-link="/home/settings/account"
          router-direction="forward"
          data-testid="account"
        >
          <ion-label>{{ $t('settings.account') }}</ion-label>
        </ion-item>

        <ion-item>
          <ion-select
            v-model="settings.locale.language"
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
            v-model="settings.appearance.gradeButtons"
          >
            {{ $t('settings.gradeButtons') }}
          </ion-toggle>
        </ion-item>

        <ion-item>
          <ion-toggle
            v-model="settings.appearance.colorfulCards"
          >
            {{ $t('settings.colorfulCards') }}
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
          v-if="isDevModeEnabled"
          :detail="true"
          router-link="/home/settings/app"
          router-direction="forward"
        >
          <ion-label>{{ $t('app.name') }}</ion-label>
        </ion-item>

        <ion-item
          v-if="isDevModeEnabled"
          @click="onClearCache"
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
  IonPage, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar,
  IonButtons
} from '@ionic/vue'
import { inject, ref } from 'vue'
import { EmailComposer } from '@awesome-cordova-plugins/email-composer'
import { useSettingsStore } from '@/app/settings'
import { BackgroundTasks, getAvailableLanguages, useClearCache } from '@/app/shared'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const i18n = inject('i18n') as any
const settings = useSettingsStore()
const clearCache = useClearCache()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const languages = getAvailableLanguages()
const isDevModeEnabled = ref(false)


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
  isDevModeEnabled.value = true
}

function onClearCache() {
  clearCache.cleanCache()
  alert('Done')
}
</script>
