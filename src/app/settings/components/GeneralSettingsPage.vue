<template>
  <ion-page ref="page">
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('settings.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content color="light">
      <ion-list :inset="true">
        <ion-item
          :detail="true"
          router-link="/home/settings/account"
          router-direction="forward"
          data-testid="account"
        >
          <ion-label>{{ $t('settings.account') }}</ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            {{ $t('settings.language') }}
          </ion-label>
          <ion-select
            v-model="locale.languageCode"
            interface="action-sheet"
            placeholder="Language"
            data-testid="language"
            @ion-change="x => onLocaleChanged(x.detail.value)"
          >
            <ion-select-option
              v-for="lang in locale.availableLanguages"
              :key="lang.code"
              :value="lang.code"
            >
              {{ lang.name }}
            </ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-label>{{ $t('settings.gradeButtons') }}</ion-label>
          <ion-toggle
            slot="end"
            v-model="appearance.gradeButtons"
          />
        </ion-item>

        <ion-item>
          <ion-label>{{ $t('settings.colorfulCards') }}</ion-label>
          <ion-toggle
            slot="end"
            v-model="appearance.colorfulCards"
          />
        </ion-item>

        <ion-item>
          <ion-label
            @click="onSendEmail"
          >
            {{ $t('settings.contactUs') }}
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonContent, IonHeader, IonItem, IonLabel, IonList,
  IonPage, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar
} from '@ionic/vue'
import { inject } from 'vue'
import { useAppearanceStore, useLocaleStore } from '@/app/settings'

const i18n = inject('i18n') as any
const locale = useLocaleStore()
const appearance = useAppearanceStore()

function onLocaleChanged(lang: string) {
  i18n.locale.value = lang
}
function onSendEmail() {
  window.open('mailto:feedback@shlokas.app', '_system')
}
</script>
