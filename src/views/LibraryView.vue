<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ t('library') }}</ion-title>
      </ion-toolbar>

      <ion-toolbar>
        <ion-searchbar
          v-model="searchQuery"
          :placeholder="t('search')"
          animated
          @ion-cancel="cancel"
        />
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item
          v-for="verse in filteredVerses"
          :key="verse.number.value"
          text-wrap
        >
          <ion-label class="ion-text-wrap">
            <h2>{{ verse.number }}</h2>
            <p>{{ verse.translation.text }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { useApp } from '@/application';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, IonSearchbar } from '@ionic/vue';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
const app = useApp()
const searchQuery = ref("")

const filteredVerses = computed(() => {
  return app.library.finqByString(searchQuery.value)
})
function cancel() { console.log("cancel") }
</script>

<style scoped>
</style>


<i18n src="@/locale/common.yml" lang="yaml" />

<i18n locale="en" lang="yaml">
library: Library
search: Query
</i18n>


<i18n locale="ru" lang="yaml">
library: Library
search: Query
</i18n>