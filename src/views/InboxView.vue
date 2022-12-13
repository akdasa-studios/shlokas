<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button
            color="primary"
            @click="onAddClicked"
          >
            {{ t('add') }}
          </ion-button>
        </ion-buttons>
        <ion-title>{{ t('inbox') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content
      :scroll-y="false"
      :scroll-x="false"
      color="light"
    >
      <div
        v-for="card in vm.cards.value"
        :key="card.id.value"
        @click="card.memorized()"
      >
        {{ card.verseNumber }}
      </div>

      <div
        id="addVerseButton"
        @click="onAddClicked"
      >
        Add
      </div>

      <div @click="onRevertClicked">
        revert
      </div>
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonTitle,
  IonButtons, IonButton
} from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { InboxViewModel } from '@/viewModels/inbox'
import { useApp } from '@/application'

const { t } = useI18n()
const app = useApp()
const vm = new InboxViewModel(app)

function onAddClicked() {
  vm.addVerse(app.library.all[0].id)
}
function onRevertClicked() {
  app.processor.revert()
  vm.sync()
}
</script>

<style scoped>
</style>


<i18n src="@/locale/common.yml" lang="yaml" />

<i18n locale="en" lang="yaml">
add: Add
inbox: Inbox
</i18n>


<i18n locale="ru" lang="yaml">
add: Добавить
inbox: Входящие
</i18n>