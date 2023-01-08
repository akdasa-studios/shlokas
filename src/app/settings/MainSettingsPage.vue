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
          <ion-label>Grade buttons</ion-label>
          <ion-toggle
            slot="end"
            v-model="appearance.colorfulCards"
          />
        </ion-item>

        <ion-item>
          <ion-label>Colorful cards</ion-label>
          <ion-toggle
            slot="end"
            v-model="appearance.gradeButtons"
          />
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
import { Storage } from '@ionic/storage'
import { useAppearanceStore, useLocaleStore } from '@/app/settings'
const deviceStorage = new Storage()
deviceStorage.create()

const locale = useLocaleStore(deviceStorage)
const appearance = useAppearanceStore(deviceStorage)

locale.load()
appearance.load()
</script>
