<template>
  <ion-item>
    {{ $t('settings.joinUs') }}
    <ion-icon
      slot="end"
      :icon="logoVk"
      class="icon"
      @click="onVkClicked"
    />
    <ion-icon
      slot="end"
      src="telegram.svg"
      class="icon"
      @click="onTelegramClicked"
    />
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonIcon } from '@ionic/vue'
import { logoVk } from 'ionicons/icons'

function onVkClicked() {
  window.open('https://vk.com/akd.studios', '_blank')
}

function onTelegramClicked() {
  window.open('https://t.me/akd_studios', '_blank')
}
</script>


<style scoped>
.icon {
  padding-left: 20px;
}
</style>