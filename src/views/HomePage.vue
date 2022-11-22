<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Shlokas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Shlokas
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <div>
        Shlokas {{ language.name }}
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue'
import { Language } from '@/models/language'

defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
  }
});

const language = new Language('EN', 'English')
</script>