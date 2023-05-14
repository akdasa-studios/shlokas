<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('app.name') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content>
      <ion-list>
        <ion-item
          v-for="item, key in data"
          :key="key"
        >
          <ion-label>{{ key }}: {{ item }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonContent, IonHeader, IonItem, IonLabel, IonList,
  IonPage, IonTitle, IonToolbar
} from '@ionic/vue'
import { Deploy } from 'cordova-plugin-ionic'
import { onMounted, reactive } from 'vue'


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const data = reactive({
  version: '',
  build: '',
  channel: '',
})


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onMounted(onLoadAppInfo)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onLoadAppInfo() {
  const version = await Deploy.getCurrentVersion()
  data.version = version?.versionId ?? 'unknown'
  data.build = version?.buildId ?? 'unknown'
  data.channel = version?.channel ?? 'unknown'
}

</script>
