<template>
  <ion-header
    translucent
  >
    <ion-toolbar>
      <ion-buttons slot="primary">
        <ion-button
          data-testid="closeVerseDialog"
          color="medium"
          @click="cancel"
        >
          {{ t('cancel') }}
        </ion-button>
      </ion-buttons>

      <ion-title>{{ props.title }}</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content
    class="ion-padding"
    data-testid="verseViewDialog"
  >
    <div class="text">
      <div
        v-for="line, id in props.text"
        :key="id"
      >
        {{ line }}
      </div>
    </div>

    <div class="translation">
      {{ props.translation }}
    </div>

    <ion-button
      data-testid="addVerseToInbox"
      color="primary"
      expand="block"
      class="margin"
      @click="addVerseToInbox"
    >
      Add verse to inbox
    </ion-button>
  </ion-content>
</template>


<script lang="ts" setup>
import {
  IonButton, IonButtons, IonContent, IonHeader,
  IonTitle, IonToolbar, modalController
} from '@ionic/vue';
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  verseId: string,
  title: string,
  text: string[],
  translation: string
}>()


const { t } = useI18n()
function cancel() {
  return modalController.dismiss(null, 'cancel');
}

function addVerseToInbox() {
  return modalController.dismiss({ verseId: props.verseId }, 'confirm');
}
// function confirm(number: string) {
//   return modalController.dismiss(number, 'confirm');
// }
</script>


<style scoped>
.text {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
  font-style: italic;
  color: #666;
}

.translation {
  font-size: 1.2rem;
  line-height: 1.2;
}

.margin {
  margin-top: 1rem;
}
</style>

<i18n src="@/locale/common.yml" lang="yaml" />

<i18n locale="en" lang="yaml">
add-verse: Add verse
number-or-text: Verse number or text
</i18n>

<i18n locale="ru" lang="yaml">
add-verse: Добавить новый стих
number-or-text: Номер или текст
</i18n>